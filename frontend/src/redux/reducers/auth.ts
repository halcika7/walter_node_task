import { AuthTypes, AuthState, AuthActionTypes } from '../types/auth';

const INITIAL_STATE: AuthState = {
  token: '',
  message: '',
  errors: {
    email: '',
    password: '',
    password2: '',
  },
  loading: true,
  status: null,
};

export const AuthReducer = (state = INITIAL_STATE, action: AuthActionTypes) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS: {
      return {
        message: '',
        errors: INITIAL_STATE.errors,
        loading: false,
        token: action.payload.token,
        status: null,
      };
    }
    case AuthTypes.SET_ERRORS:
    case AuthTypes.SET_MESSAGE: {
      return { ...state, ...action.payload };
    }
    case AuthTypes.CLEAR_ERRORS: {
      return {
        ...state,
        errors: INITIAL_STATE.errors,
        message: '',
        status: null,
      };
    }
    case AuthTypes.LOGOUT: {
      return { ...INITIAL_STATE, loading: false };
    }
    default:
      return state;
  }
};
