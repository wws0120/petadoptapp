import {
  getEventList,
  getEvents,
  getFeaturedEvents,
  getEventContent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../services/eventServices';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useGetEventContent = (eventId: string) => {
  const dispatch = useDispatch;
  const queryKey = ['selected-event', String(eventId)];
  const fetcher = () => getEventContent(eventId);

  return useQuery(queryKey, fetcher, {
    enabled: !!eventId,
  });
};

export const useGetEventlist = (page = 1) => {
  const queryKey = ['eventlist', page];
  const fetcher = () => getEventList(page);

  return useQuery({ queryKey, queryFn: fetcher, keepPreviousData: true });
};

export const useGetFeaturedEvents = () => {
  const queryKey = ['featuredevents'];
  const fetcher = () => getFeaturedEvents();

  return useQuery({ queryKey, queryFn: fetcher });
};

export const useGetEvents = (category) => {
  const queryKey = ['events', category];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ queryKey, pageParam }) =>
      getEvents({ limit: 12, lastCursor: pageParam, queryKey }),
    getNextPageParam: (lastPage) => {
      // Retrun lastCursor as pageParam

      if (lastPage.data.metaData.hasNextPage) {
        return lastPage?.data.metaData.lastCursor;
      }
      return undefined;
    },
  });
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['eventlist']);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, payload }) => updateEvent(eventId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['eventlist']);
      queryClient.invalidateQueries(['selected-event']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => deleteEvent(eventId),

    onSuccess: () => {
      queryClient.invalidateQueries(['eventlist']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useSetEventStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => updateEvent(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['eventlist']);
      queryClient.invalidateQueries(['selected-event']);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
