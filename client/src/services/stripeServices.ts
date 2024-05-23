import axiosInstance from '../libs/axios/axiosUtils';

export const createCheckoutSession = async (body) => {
  return axiosInstance.post(`/stripe/create-checkout-session`, body);
};
