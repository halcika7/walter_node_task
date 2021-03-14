export enum ProfileTypes {
  SET_MESSAGE = '@@PROFILE/SET_MESSAGE',
  SET_ERRORS = '@@PROFILE/SET_ERRORS',
  CLEAR = '@@PROFILE/CLEAR',
}

export interface PasswordData {
  password: string;
  password2: string;
}

export interface ProfileState {
  message: string;
  errors: PasswordData;
  status: number | null;
}

interface SetErrors {
  type: typeof ProfileTypes.SET_ERRORS;
  payload: { errors: PasswordData };
}

interface SetMessage {
  type: typeof ProfileTypes.SET_MESSAGE;
  payload: { message: string; status: number | null };
}

interface Clear {
  type: typeof ProfileTypes.CLEAR;
}

export type ProfileActionTypes = SetErrors | SetMessage | Clear;
