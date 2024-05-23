import { AxiosError, AxiosRequestConfig } from 'axios';
import { setCredentials, logout } from '../../redux/reducers/authSlice';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import axiosInstance from './axiosUtils';

const setUpInterceptor = (store: any) => {
  let isRefreshing = false; // Flag to indicate if the token refresh process is ongoing
  const handleError = async (error: AxiosError) => {
    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (!store.getState().auth?.token) {
        return config;
      }
      // Get the access token from Redux state
      if (store.getState().auth?.token) {
        const accessToken = store.getState().auth?.token;

        // Check if the access token is expired
        const isExpired = dayjs().isAfter(
          dayjs.unix(jwtDecode(accessToken).exp)
        );

        // If the access token is expired, refresh the token
        if (isExpired && !isRefreshing) {
          isRefreshing = true; // Set the flag to indicate that the refresh process is ongoing

          try {
            // Make a request to the token refresh endpoint
            const response = await axiosInstance.get('/auth/refresh');

            // Update the access token in the Redux state
            store.dispatch(
              setCredentials({ accessToken: response.data.accessToken })
            );
          } catch (error) {
            // Handle the token refresh error
            console.error('Token refresh failed:', error);
            store.dispatch(logout());
          } finally {
            isRefreshing = false; // Set the flag to indicate that the refresh process is complete
          }
        }
        // Set the Authorization header with the existing access token
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use((response) => response, handleError);
};

export default setUpInterceptor;
