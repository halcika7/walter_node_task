import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

export type AppThunkDispatch = ThunkDispatch<
  Record<string, unknown>,
  Record<string, unknown>,
  AnyAction
>;

export const useThunkDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
