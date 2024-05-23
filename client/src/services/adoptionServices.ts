import axiosInstance from '../libs/axios/axiosUtils';

export const getAllAdoptions = (page, status) => {
  return axiosInstance.get(`/adoption/records`, {
    params: {
      page: page,
      status: status || undefined,
    },
  });
};

export const getAdoptionsByUser = (id) => {
  return axiosInstance.get(`/adoption/user/${id}`);
};

export const getAdoptionById = (id) => {
  return axiosInstance.get(`/adoption/record/${id}`);
};

export const getMyAdoptionRecord = async () => {
  return axiosInstance.get(`/adoption/myadoptions/`);
};

export const sendAdoptionRequest = (animalId) => {
  return axiosInstance.post(`/adoption/${animalId}/apply`);
};

export const updateAdoption = (payload) => {
  return axiosInstance.put(`/adoption/${payload.id}/update`, payload);
};

export const updateAdoptionStatus = (payload) => {
  return axiosInstance.put(`/adoption/${payload.id}/status`, payload);
};

export const deleteAdoption = (id) => {
  return axiosInstance.delete(`/adoption/${id}/delete`);
};
