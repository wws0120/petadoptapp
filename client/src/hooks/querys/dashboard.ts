import {
  getDashboardCounts,
  getDonationSummary,
  getRecentAnimals,
  getActiveAdoptions,
} from '../../services/dashboardServices';

import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useGetDashboardCounts = () => {
  const queryKey = ['dashboard-counts'];
  const fetcher = () => getDashboardCounts();

  return useQuery(queryKey, fetcher);
};

export const useGetDonationSummary = () => {
  const queryKey = ['donation-summary'];
  const fetcher = () => getDonationSummary();

  return useQuery(queryKey, fetcher);
};

export const useGetRecentAnimals = () => {
  const queryKey = ['recent-animals'];
  const limit = 20;
  const fetcher = () => getRecentAnimals(limit);

  return useQuery(queryKey, fetcher);
};

export const useGetActiveAdoptions = () => {
  const queryKey = ['active-adoptions'];
  const fetcher = () => getActiveAdoptions();

  return useQuery(queryKey, fetcher);
};
