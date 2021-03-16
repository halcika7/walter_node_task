import { Suspense, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '@components/spinner';

interface Props {
  Component: FC<Record<string, unknown>>;
  redirect?: boolean;
  exact: boolean;
  path: string;
}

const PublicRoute: FC<Props> = ({ Component, redirect = false, ...rest }) => (
  <Suspense fallback={<Spinner />}>
    <Route
      {...rest}
      render={props =>
        !redirect ? <Component {...props} /> : <Redirect to="/lists" />
      }
    />
  </Suspense>
);

export default PublicRoute;
