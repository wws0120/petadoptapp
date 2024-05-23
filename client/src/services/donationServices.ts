import axiosInstance from '../libs/axios/axiosUtils';

export const getDonationList = async (page: number, limit = 15) => {
  return axiosInstance.get('/donation/donationlist', {
    params: {
      page: page,
      limit: limit,
    },
  });
};

export const getMyDonationRecord = async () => {
  return axiosInstance.get('/donation/mydonations/');
};

export const deleteDonation = async (id) => {
  return axiosInstance.delete(`/donation/${id}`);
};
