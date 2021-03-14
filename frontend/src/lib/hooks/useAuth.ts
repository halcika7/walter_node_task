import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const redux = createSelector(
  (state: AppState) => state.auth.token,
  (state: AppState) => state.auth.loading,
  (token, loading) => ({ isAuthenticated: !!token, loading })
);

export const useAuth = () => {
  const data = useSelector(redux);

  return { ...data };
};
