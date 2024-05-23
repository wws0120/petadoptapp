import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';
import {
  getUserList,
  getUserById,
  addUser,
  editUserStatus,
  editUserRole,
  updateUserById,
  deleteUser,
  getPendingUsers,
  getUserDetail,
} from '../../services/userServices';

export const useGetUserList = (page = 1, status) => {
  const queryKey = ['userlist', page, status];
  const limit = 15;
  const fetcher = () => getUserList(page, limit, status);

  return useQuery({ queryKey, queryFn: fetcher, keepPreviousData: true });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => updateUserById(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['userlist']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useEditUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => editUserStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['selected-user']);
      queryClient.invalidateQueries(['userlist']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useEditUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => editUserRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['selected-user']);
      queryClient.invalidateQueries(['userlist']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useGetPendingUsers = (email?: string) => {
  const queryKey = ['pendingusers'];
  const fetcher = () => getPendingUsers(email);

  return useQuery(queryKey, fetcher);
};

export const useGetUserDetail = (userId: string) => {
  const queryKey = ['userDetail'];
  const fetcher = () => getUserDetail(userId);

  return useQuery(queryKey, fetcher);
};
