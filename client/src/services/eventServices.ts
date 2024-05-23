import axiosInstance from '../libs/axios/axiosUtils';

export const getEventList = async (page) => {
  return axiosInstance.get(`/events/eventlist?page=${page}`);
};

export const getEvents = async ({ limit = 12, lastCursor = '', queryKey }) => {
  return axiosInstance.get(`/events`, {
    params: { limit, lastCursor, category: queryKey[1] },
  });
};

export const getFeaturedEvents = async () => {
  return axiosInstance.get(`/events`, {
    params: { limit: 4 },
  });
};

export const getEventContent = async (id: string) => {
  return axiosInstance.get(`/events/${id}`);
};

export const createEvent = async (body) => {
  return axiosInstance.post(`/events/create`, body);
};

export const updateEvent = async (id, body) => {
  return axiosInstance.put(`/events/edit/${id}`, body);
};

export const deleteEvent = async (id) => {
  return axiosInstance.delete(`/events/delete/${id}`);
};
