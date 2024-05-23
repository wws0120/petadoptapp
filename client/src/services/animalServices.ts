import axiosInstance from '../libs/axios/axiosUtils';

export const getFilteredAnimals = ({ queryKey, lastCursor = '' }) => {
  const limit = 18;
  const { categories, sex, minAge, maxAge, minWieght, maxWieght } = queryKey[1];
  const apiUrl = `/animals?categories=${categories}&sex=${sex}&limit=${limit}&minAge=${minAge}&maxAge=${maxAge}&minWieght=${minWieght}&maxWieght=${maxWieght}&lastCursor=${lastCursor}`;
  return axiosInstance.get(apiUrl);
};

export const getAnimalsBySpecies = (
  page: number,
  limit: number,
  species: string
) => {
  return axiosInstance.get(`/animals/species`, { species: species });
};

export const getRelatedAnimals = (category) => {
  return axiosInstance.get('/animals/category', {
    params: {
      category: category,
    },
  });
};

export const getFeaturedAnimals = (limit = 10) => {
  //const limit = 10;

  return axiosInstance.get('/animals/featured', {
    params: {
      limit: 10,
    },
  });
};

export const getAnimalList = (page) => {
  return axiosInstance.get(`/animals/list?page=${page}`);
};

export const addAnimal = async (body: Animal) => {
  return axiosInstance.post('/animals', body);
};

export const updateAnimal = async (id, body: Animal) => {
  return axiosInstance.put(`/animals/${id}`, body);
};

export const deleteAnimal = async (ids: string[]) => {
  return axiosInstance.post(`/animals/deleteSelected/`, { ids });
};

export const getAnimalById = (animalId: string) => {
  return axiosInstance.get(`/animals/${animalId}`);
};
