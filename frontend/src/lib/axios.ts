import Axios from 'axios';
import { store } from '../redux/index';
import { authSuccess, logoutAction } from '@actions';

const ax = Axios.create({
  withCredentials: true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const rejectPromise = (error: Record<string, unknown> | string) =>
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
    const refreshUrl = `/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      store.dispatch(logoutAction());
      return rejectPromise(error.response);
    }

    if (errorStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get('/auth/refresh')
        .then(res => {
          const { accessToken } = res.data;
          // dispatch refresh success
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          store.dispatch(authSuccess(accessToken));
          // return originalRequest object with Axios.
          return axios(originalRequest);
        })
        .catch(error => {
          store.dispatch(logoutAction());

          return rejectPromise(error.response);
        });
    }

    return rejectPromise(error.response);
  }
);

export const axios = ax;
