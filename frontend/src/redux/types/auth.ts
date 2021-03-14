export enum AuthTypes {
  AUTH_SUCCESS = '@@AUTH/AUTH_SUCCESS',
  SET_MESSAGE = '@@AUTH/SET_MESSAGE',
  SET_ERRORS = '@@AUTH/SET_ERRORS',
  CLEAR_ERRORS = '@@AUTH/CLEAR_ERRORS',
  LOGOUT = '@@AUTH/LOGOUT',
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  password2: string;
}

export interface AuthState {
  token: string;
  message: string;
  errors: RegisterData;
  loading: boolean;
  status: number | null;
}

interface Success {
  type: typeof AuthTypes.AUTH_SUCCESS;
  payload: { token: string };
}

interface SetErrors {
  type: typeof AuthTypes.SET_ERRORS;
  payload: { errors: RegisterData };
}

interface SetMessage {
  type: typeof AuthTypes.SET_MESSAGE;
  payload: { message: string; status: number | null };
}

interface Logout {
  type: typeof AuthTypes.LOGOUT;
}

interface ClearErrors {
  type: typeof AuthTypes.CLEAR_ERRORS;
}

export type AuthActionTypes =
  | Success
  | SetErrors
  | SetMessage
  | Logout
  | ClearErrors;
