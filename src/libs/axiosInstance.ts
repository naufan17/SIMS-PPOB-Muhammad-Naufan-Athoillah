import Axios, { type AxiosInstance } from 'axios';
import { store } from '@/store/store';
import { destroyCredentials } from '@/store/slices/authSlice';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data.message === 'jwt expired' ||
      error.response?.data.message === 'jwt malformed' ||
      error.response?.data.message === 'jwt signature is required'
    ) {
      store.dispatch(destroyCredentials())
      window.location.href = '/login'
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;