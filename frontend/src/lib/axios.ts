import Axios from 'axios';
import { store } from '../redux/index';
import { authSuccess, logout } from '@actions';

const url = process.env.REACT_APP_BACKEND_URL;

const ax = Axios.create({
  withCredentials: true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  baseURL: url,
});

const rejectPromise = (error: Record<string, any> | string) =>
  Promise.resolve(error);

ax.interceptors.request.use(config => {
  const newConfig = { ...config };
  const Authorization = `Bearer ${store.getState().auth.token}`;
  newConfig.headers = {
    ...newConfig.headers,
    common: { ...newConfig.headers.common, Authorization },
  };

  return newConfig;
});

ax.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const errorStatus = error.response?.status;
    const refreshUrl = `${url}/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      store.dispatch<any>(logout);
      return rejectPromise(error.response);
    }

    if (errorStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get('/auth/refresh', { params: { firstCheck: false } })
        .then(res => {
          if (res.data.accessToken) {
            const { accessToken } = res.data;
            // dispatch refresh success
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            };
            store.dispatch(authSuccess(accessToken));
            // return originalRequest object with Axios.
            return axios(originalRequest);
          }

          store.dispatch<any>(logout);

          return rejectPromise(error.response);
        });
    }

    return rejectPromise(error.response);
  }
);

export const axios = ax;
