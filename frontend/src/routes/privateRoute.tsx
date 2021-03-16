import { Suspense, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '@components/spinner';

interface Props {
  Component: FC<Record<string, unknown>>;
  isAuthenticated: boolean;
  exact: boolean;
  path: string;
}

const PrivateRoute: FC<Props> = ({ Component, isAuthenticated, ...rest }) => (
  <Suspense fallback={<Spinner />}>
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  </Suspense>
);

export default PrivateRoute;
