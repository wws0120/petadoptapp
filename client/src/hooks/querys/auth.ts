import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  IRegisterUserPayload,
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from '../../services/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../../redux/reducers/authSlice';
import { showLoading, hideLoading } from '../../redux/reducers/loadingSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (payload: any) => loginUser(payload),
    onMutate: () => {
      dispatch(showLoading());
    },
    onSuccess: (res) => {
      toast.success(res.message);
      const token = jwtDecode(res.data.accessToken);

      dispatch(setCredentials(res.data));
    },
    onError: (err: any) => {
      console.log(err);
    },

    onSettled: () => {
      dispatch(hideLoading());
    },
  });
};

export const useRefreshMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async () => refreshToken(),
    onSuccess: (res) => {
      toast.success(res.message);
      localStorage.setItem('token', JSON.stringify(res.data.accessToken));
      const token = jwtDecode(res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(token.user));
      dispatch(setCredentials(res.data));
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (payload: any) => logoutUser(payload),
    onSuccess: () => {
      toast.success(res.message);

      dispatch(logout());
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: IRegisterUserPayload) => registerUser(payload),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};
