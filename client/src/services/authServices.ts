import axiosInstance from '../libs/axios/axiosUtils';
export interface IRegisterUserPayload {
  email: string;
  password: string;
}

export const registerUser = (payload: IRegisterUserPayload) => {
  return axiosInstance.post('/auth/register', {
    payload,
  });
};

export const loginUser = (
  user: {
    username: string;
    password: string;
  }
  //tfaCode: string,
  //recoveryCode: string
) => {
  return axiosInstance.post('/auth/login', {
    user,
    //tfaCode,
    //recoveryCode,
  });
};

export const refreshToken = () => {
  return axiosInstance.get('/auth/refresh');
};

export const logoutUser = (
  user: {
    username: string;
    password: string;
  }
  //tfaCode: string,
  //recoveryCode: string
) => {
  return axiosInstance.post('/auth/login', {
    user,
    //tfaCode,
    //recoveryCode,
  });
};
