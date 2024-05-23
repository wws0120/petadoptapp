import axiosInstance from '../libs/axios/axiosUtils';

export const getUserList = async (page: number, limit = 15, status) => {
  return axiosInstance.get(`/users/userlist`, {
    params: {
      page: page,
      limit: limit,
      status: status || undefined,
    },
  });
};

export const getUserById = async (id: string) => {
  return axiosInstance.get(`/users/${id}`);
};

export const getUserProfileById = (userId: string) => {
  return axiosInstance.get(`/users/userprofile/${userId}`);
};

export const updateUserProfileById = (userId: string, payloads) => {
  return axiosInstance.get(`/users/userprofile/${userId}`, { payloads });
};

export const getMyUserInfo = async () => {
  return axiosInstance.get(`/users/me`);
};

export const getMyProfile = async () => {
  return axiosInstance.get(`/users/myprofile`);
};

export const updateMyProfile = async (payloads) => {
  return axiosInstance.put(`/users/myprofile`, { payloads });
};

export const updateProfilePic = (imageUrl: string) => {
  return axiosInstance.put(`/users/me/image`, { imageUrl });
};

export const updateMyProfileById = async (userId: string, payloads) => {
  return axiosInstance.put(`/users/${userId}/profile`, { payloads });
};

export const updateProfilePicById = (userId: string, imageUrl: string) => {
  return axiosInstance.put(`/users/${userId}/image`, { imageUrl });
};

export const getUserDetail = async (userId: string) => {
  return axiosInstance.get(`/users/${userId}/detail`);
};

export const addUser = async (body: any) => {
  return axiosInstance.post('/users', body);
};

export const editUserStatus = async (body: any) => {
  return axiosInstance.put(`/users/${body.id}/status`, body);
};

export const editUserRole = async (body: any) => {
  return axiosInstance.put(`/users/${body.id}/role`, body);
};

export const updateUserById = async (body: any) => {
  return axiosInstance.put(`/users/${body.id}`, body);
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`/users/${userId}`);
};

export const getPendingUsers = (email?: string) => {
  return axiosInstance.get('/users/pendingusers/', { email });
};

export const getConfigSettings = (id?: string) => {
  return axiosInstance.get('/users/settings/config', { id });
};

export const updateUserRole = (userId: string, assignedRole: string) => {
  return axiosInstance.put(`/users/role/${userId}`, { assignedRole });
};
