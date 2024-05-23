import {
  getFilteredAnimals,
  getAnimalById,
  getAnimalList,
  addAnimal,
  updateAnimal,
  deleteAnimal,
  getRelatedAnimals,
  getFeaturedAnimals,
} from '../../services/animalServices';

import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

export const useGetAnimalDetail = (animalId: string) => {
  const queryKey = ['selected-animal', String(animalId)];
  const fetcher = () => getAnimalById(animalId);

  return useQuery(queryKey, fetcher, {
    enabled: !!animalId,
  });
};

export const useGetAnimalList = (page = 1) => {
  const queryKey = ['animal-list', page];
  const fetcher = () => getAnimalList(page);

  return useQuery({ queryKey, queryFn: fetcher, keepPreviousData: true });
};

export const useGetFilteredAnimals = ({
  categories,
  sex,
  minAge,
  maxAge,
  minWieght,
  maxWieght,
}) => {
  const queryKey = [
    'filtered-animals',
    { categories, sex, minAge, maxAge, minWieght, maxWieght },
  ];
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ queryKey, pageParam }) =>
      getFilteredAnimals({ queryKey, lastCursor: pageParam }),
    getNextPageParam: (lastPage) => {
      // Retrun lastCursor as pageParam

      if (lastPage.data.metaData.hasNextPage) {
        return lastPage?.data.metaData.lastCursor;
      }
      return undefined;
    },
  });
};

export const useGetRelatedAnimals = (category) => {
  const queryKey = ['related-animals'];
  const fetcher = () => getRelatedAnimals(category);

  return useQuery(queryKey, fetcher, {
    enabled: !!category,
  });
};

export const useGetFeaturedAnimals = () => {
  const queryKey = ['featured-animals'];
  const limit = 10;
  const fetcher = () => getFeaturedAnimals(limit);

  return useQuery(queryKey, fetcher);
};

export const useAddAnimalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => addAnimal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['animals']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useUpdateAnimalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => updateAnimal(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['animals']);
      queryClient.invalidateQueries(['selected-animal']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteAnimalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (animalIds: string[]) => deleteAnimal(animalIds),

    onSuccess: () => {
      queryClient.invalidateQueries(['animals']);
      queryClient.invalidateQueries(['animal-list']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
