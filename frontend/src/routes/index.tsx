import styled from 'styled-components';

// components
import { Route, Switch } from 'react-router-dom';
import Sidebar from '@components/Sidebar';
import { CenterDiv, Flex } from '@styled/components';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import ErrorPage from '@pages/404';
import Spinner from '@components/spinner';

// routes
import { unAuthorizedRoutes, authenticatedRoutes } from './routes';

// hooks
import { useAuth } from '@hooks/useAuth';

const AuthWrapper = styled(Flex)`
  margin: 2rem 0;
  z-index: 5;

  > div:nth-child(2),
  > section:nth-child(2) {
    width: 100%;
    margin-left: 3rem;
  }

  @media (max-width: 992px) {
    flex-direction: column;

    > div:nth-child(2),
    > section:nth-child(2) {
      margin-left: 0;
    }
  }
`;

const LoadingWrapper = styled(CenterDiv)`
  min-height: 100vh;
`;

const paths = authenticatedRoutes.map(route => route.path);

const Routes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  return (
    <Switch>
      {unAuthorizedRoutes.map(props => (
        <PublicRoute redirect={isAuthenticated} key={props.path} {...props} />
      ))}

      <Route
        exact
        path={paths}
        render={() => (
          <AuthWrapper>
            <Sidebar />
            {authenticatedRoutes.map(props => (
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                key={props.path}
                {...props}
              />
            ))}
          </AuthWrapper>
        )}
      />

      <Route exact path="*" render={() => <ErrorPage />} />
    </Switch>
  );
};

export default Routes;
