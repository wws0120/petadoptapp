import {
  getAllAdoptions,
  getAdoptionById,
  getAdoptionsByUser,
  getMyAdoptionRecord,
  sendAdoptionRequest,
  updateAdoption,
  updateAdoptionStatus,
  deleteAdoption,
} from '../../services/adoptionServices';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useGetAllAdoptions = (page = 1, status) => {
  const queryKey = ['adoptions', page, status];
  const fetcher = () => getAllAdoptions(page, status);

  return useQuery({ queryKey, queryFn: fetcher, keepPreviousData: true });
};

export const useGetAdoptionById = (adoptionId: string) => {
  const queryKey = ['selected-adoption', String(adoptionId)];
  const fetcher = () => getAdoptionById(adoptionId);

  return useQuery(queryKey, fetcher);
};

export const useGetAdoptionByUser = (userId: string) => {
  const queryKey = ['adoptions-by-user', String(userId)];
  const fetcher = () => getAdoptionsByUser(userId);

  return useQuery(queryKey, fetcher);
};

export const useGetMyAdoptionRecord = () => {
  const queryKey = ['myadoptions'];
  const fetcher = () => getMyAdoptionRecord();

  return useQuery(queryKey, fetcher);
};

export const useAdoptionRequestMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (animalId) => sendAdoptionRequest(animalId),
    onSuccess: () => {
      queryClient.invalidateQueries(['adoptions']);
      queryClient.invalidateQueries(['adoptions-by-user']);
      navigate('/adoptionreceived');
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.error);
    },
  });
};

export const useUpdateAdoption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => updateAdoption(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['adoptions']);
      queryClient.invalidateQueries(['selected-adoption']);
      queryClient.invalidateQueries(['adoptions-by-user']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useUpdateAdoptionStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => updateAdoptionStatus(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['adoptions']);
      queryClient.invalidateQueries(['selected-adoption']);
      queryClient.invalidateQueries(['adoptions-by-user']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteAdoption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adoptionId: string) => deleteAdoption(adoptionId),

    onSuccess: () => {
      queryClient.invalidateQueries(['adoptions']);
      queryClient.invalidateQueries(['selected-adoption']);
      queryClient.invalidateQueries(['adoptions-by-user']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
