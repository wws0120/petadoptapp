import {
  getFavAnimals,
  addFavorite,
  removeFavorite,
} from '../../services/favoriteServices';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export const useGetFavoriteAnimals = (userId: string) => {
  const queryKey = ['saved-animal', String(userId)];
  const fetcher = () => getFavAnimals();

  return useQuery(queryKey, fetcher, {
    enabled: !!userId,
  });
};

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (animalId: string) => addFavorite(animalId),
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-animal']);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (animalId: string) => removeFavorite(animalId),
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-animal']);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};
