import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import NavLink from '../NavLink';
import { useAuth } from '@hooks/useAuth';

import { ReactComponent as LogoLight } from '@images/logo-light.svg';
import { ReactComponent as LogoDark } from '@images/logo-dark.svg';

const Link = styled(NavLink)`
  cursor: pointer;
  z-index: 5;
`;

const LogoLink = () => {
  const { isAuthenticated } = useAuth();
  const { value } = useDarkMode();
  const Logo = !value ? LogoLight : LogoDark;

  return (
    <Link
      to={isAuthenticated ? '/dashboard' : '/'}
      aria-label={
        isAuthenticated
          ? 'Navigation link to Dashboard'
          : 'Navigation Link to Home Page'
      }
    >
      <Logo />
    </Link>
  );
};

export default LogoLink;
