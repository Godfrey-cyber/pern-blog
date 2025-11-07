import axios from 'axios';
// an axios instance 
import { store } from "../redux/store.js"
import { logout } from "../redux/userSlice.js"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    const isAuthEndpoint = originalRequest.url?.includes('/users/login') || originalRequest.url?.includes('/users/signup') ||originalRequest.url?.includes('/users/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.get("/users/refresh");
        store.dispatch(loginSuccess(refreshResponse.data));

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return axiosInstance(originalRequest); // retry request
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const formatDate = (isoString, locale = "en-US", options = {}) => {
  const date = new Date(isoString)
  const defaultOptions =  {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    timeZoneName: 'short'
  }
  return date.toLocaleString(locale, { ...defaultOptions, ...options })
}

export const trimString = (str, maxLength) => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}