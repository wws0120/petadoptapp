import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/reducers/authSlice';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const BaseAPI = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BaseAPI,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
