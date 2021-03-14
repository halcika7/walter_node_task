import { axios } from '@axios';
import { AppThunkDispatch } from '@dispatch';
import {
  AuthTypes,
  AuthActionTypes,
  LoginData,
  RegisterData,
} from '../types/auth';

export const setMessage = (
  message: string,
  status: number | null
): AuthActionTypes => ({
  type: AuthTypes.SET_MESSAGE,
  payload: { message, status },
});

export const setErrors = (errors: RegisterData): AuthActionTypes => ({
  type: AuthTypes.SET_ERRORS,
  payload: { errors },
});

export const authSuccess = (token: string): AuthActionTypes => ({
  type: AuthTypes.AUTH_SUCCESS,
  payload: { token },
});

export const logoutAction = (): AuthActionTypes => ({ type: AuthTypes.LOGOUT });

export const login = (loginData: LoginData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post('/auth/', loginData);

  if (status !== 200) return dispatch(setMessage(data.message, status));

  return dispatch(authSuccess(data.accessToken));
};

export const register = (registerData: RegisterData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post('/auth/register', registerData);

  if (data.errors) return dispatch(setErrors(data.errors));

  return dispatch(setMessage(data.message, status));
};

export const refresh = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get(`/auth/refresh?firstCheck=true`);

  if (data?.accessToken) return dispatch(authSuccess(data.accessToken));

  return dispatch(logoutAction());
};

export const logout = async (dispatch: AppThunkDispatch) => {
  await axios.post('/auth/logout');
  return dispatch(logoutAction());
};

export const clearErrors = (): AuthActionTypes => ({
  type: AuthTypes.CLEAR_ERRORS,
});
