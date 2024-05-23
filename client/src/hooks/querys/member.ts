import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getMyUserInfo,
  getMyProfile,
  updateProfilePic,
  updateMyProfile,
} from '../../services/userServices';
import { loginChecker } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useGetCurrentUser = () => {
  const queryKey = ['currentUser'];
  const fetcher = () => getMyUserInfo();

  return useQuery(queryKey, fetcher, {
    enabled: loginChecker(),
  });
};

export const useGetMyProfile = () => {
  const queryKey = ['myProfile'];

  const fetcher = () => getMyProfile();

  return useQuery(queryKey, fetcher, {
    enabled: loginChecker(),
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payloads) => updateMyProfile(payloads),
    onSuccess: (res) => {
      toast.success('user profile updated successfully');
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err: any) => {
      console.log(err);
      toast.success('user profile update failed');
    },
  });
};

export const useUpdateMyImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (imageUrl: string) => updateProfilePic(imageUrl),
    onSuccess: (res) => {
      toast.success('image updated successfully');
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err: any) => {
      console.log(err);
      toast.success('image update failed');
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
