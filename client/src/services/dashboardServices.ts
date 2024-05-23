import axiosInstance from '../libs/axios/axiosUtils';

export const getDashboardCounts = () => {
  return axiosInstance.get('/dashboard/count');
};

export const getDonationSummary = () => {
  return axiosInstance.get('/dashboard/donationsummary');
};

export const getRecentAnimals = (limit = 20) => {
  return axiosInstance.get('/dashboard/recentanimals', {
    params: {
      limit,
    },
  });
};

export const getActiveAdoptions = () => {
  return axiosInstance.get('/dashboard/activeadoptions');
};
