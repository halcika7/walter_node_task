import { Suspense, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '@components/spinner';

interface Props {
  Component: FC<Record<string, any>>;
  isAuthenticated: boolean;
  exact: boolean;
  path: string;
}

const PrivateRoute = ({ Component, isAuthenticated, ...rest }: Props) => (
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
