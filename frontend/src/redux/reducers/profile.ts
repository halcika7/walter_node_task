import {
  ProfileTypes,
  ProfileState,
  ProfileActionTypes,
} from '@ctypes/profile';

const INITIAL_STATE: ProfileState = {
  message: '',
  errors: {
    password: '',
    password2: '',
  },
  status: null,
};

export const ProfileReducer = (
  state = INITIAL_STATE,
  action: ProfileActionTypes
) => {
  switch (action.type) {
    case ProfileTypes.SET_ERRORS:
    case ProfileTypes.SET_MESSAGE: {
      return { ...state, ...action.payload };
    }
    case ProfileTypes.CLEAR: {
      return {
        ...state,
        errors: INITIAL_STATE.errors,
        message: '',
        status: null,
      };
    }
    default:
      return state;
  }
};
