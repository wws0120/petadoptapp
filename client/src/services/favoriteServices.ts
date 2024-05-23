import axiosInstance from '../libs/axios/axiosUtils';

export const getFavAnimals = () => {
  return axiosInstance.get(`/favorite/favoritelist`);
};

export const addFavorite = (animalId: string) => {
  return axiosInstance.put(`/favorite/add/${animalId}`);
};

export const removeFavorite = (animalId: string) => {
  return axiosInstance.put(`/favorite/remove/${animalId}`);
};
