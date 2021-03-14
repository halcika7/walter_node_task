import styled from 'styled-components';
// components
import {
  Container,
  setMarginPadding,
  setHeightWidth,
  AlignCenterFlex,
  CenterAllFlex,
} from '@styled/components';
import ToggleButtonTheme from '../ToggleThemeButton';
import NavLink from '../NavLink';
import LogoLink from '../LogoLink';
// hooks
import { useAuth } from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
// actions
import { logout } from '@actions';

const Header = styled.header`
  display: flex;
  position: relative;
  ${setMarginPadding('2rem 0', '24px 0')}

  &:before {
    ${setHeightWidth('324px', '1440px')}
    content: '';
    position: absolute;
    top: -130px;
    right: 0;
    background-image: ${props => props.theme.bg.header};
    z-index: 0;
  }

  ${Container} {
    ${AlignCenterFlex}
  }
`;

const Links = styled.div`
  display: flex;
  margin-left: auto;
  z-index: 5;
`;

const LoginLink = styled(NavLink)`
  ${CenterAllFlex}
  border-radius: 30px;
  background-color: ${props => props.theme.bg.accent};
  color: ${props => props.theme.colors.white};
  padding: 8px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  width: auto;
  cursor: pointer;
  box-shadow: ${props => props.theme.boxShadow};
`;

const RegisterLink = styled(LoginLink)`
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.white};
  font-weight: 300;
  margin-left: 8px;
`;

const LogoutButton = styled(LoginLink)`
  background: tomato;
  color: ${props => props.theme.colors.white};
  border: none;
`;

const Nav = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useAuth();

  const onLogout = () => dispatch(logout);

  return (
    <Header>
      {!loading && (
        <Container>
          <LogoLink />
          <ToggleButtonTheme />
          {!isAuthenticated ? (
            <Links>
              <LoginLink to="/login">Login</LoginLink>
              <RegisterLink to="/register">Register</RegisterLink>
            </Links>
          ) : (
            <Links>
              <LogoutButton type="button" onClick={onLogout} as="button">
                Logout
              </LogoutButton>
            </Links>
          )}
        </Container>
      )}
    </Header>
  );
};

export default Nav;
