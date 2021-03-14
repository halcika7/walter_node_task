import { axios } from '@axios';
import {
  ProfileActionTypes,
  ProfileTypes,
  PasswordData,
} from '@ctypes/profile';
import { AppThunkDispatch } from '@dispatch';

export const setProfileMessage = (
  message: string,
  status: number | null
): ProfileActionTypes => ({
  type: ProfileTypes.SET_MESSAGE,
  payload: { message, status },
});

export const setProfileErrors = (errors: PasswordData): ProfileActionTypes => ({
  type: ProfileTypes.SET_ERRORS,
  payload: { errors },
});

export const clearProfileState = (): ProfileActionTypes => ({
  type: ProfileTypes.CLEAR,
});

export const changePassword = (passwords: PasswordData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.put('/profile/', passwords);

  if (data.errors) return dispatch(setProfileErrors(data.errors));

  return dispatch(setProfileMessage(data.message, status));
};
