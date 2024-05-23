import axiosInstance from '../libs/axios/axiosUtils';

export const getCloudinarySign = (folder) => {
  return axiosInstance.post('/api/sign-upload', { folder });
};
