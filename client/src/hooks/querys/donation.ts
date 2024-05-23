import { useQuery } from '@tanstack/react-query';
import {
  getMyDonationRecord,
  getDonationList,
} from '../../services/donationServices';

export const useGetMyDonationRecord = () => {
  const queryKey = ['mydonations'];
  const fetcher = () => getMyDonationRecord();

  return useQuery(queryKey, fetcher);
};

export const useGetDonationList = (page = 1) => {
  const queryKey = ['donationlist', page];
  const limit = 15;
  const fetcher = () => getDonationList(page, limit);

  return useQuery({ queryKey, queryFn: fetcher, keepPreviousData: true });
};
