import { combineReducers, Reducer } from 'redux';

// states
import { AuthState } from '@ctypes/auth';
import { ProfileState } from '@ctypes/profile';
import { ListState } from '@ctypes/list';

// reducers
import { AuthReducer as auth } from './auth';
import { ProfileReducer as profile } from './profile';
import { ListReducer as list } from './list';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  list: ListState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth,
  profile,
  list,
});
