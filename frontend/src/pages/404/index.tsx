import styled from 'styled-components';
// hooks
import { useAuth } from '@hooks/useAuth';
// components
import {
  CenterDiv,
  FlexColumn,
  CenterAllFlex,
  setMarginPadding,
} from '@styled/components';
import { Link } from 'react-router-dom';

import { ReactComponent as Err } from '@images/404.svg';

const Wrapper = styled(CenterDiv)`
  ${FlexColumn}
  padding: 100px 0;
`;

const CustomLink = styled(Link)`
  ${CenterAllFlex}
  ${setMarginPadding('2rem 0', '8px 24px')}
  border-radius: 30px;
  background-color: ${props => props.theme.bg.accent};
  color: ${props => props.theme.colors.white};
  font-size: 0.9rem;
  font-weight: 400;
  width: auto;
  cursor: pointer;
  box-shadow: ${props => props.theme.boxShadow};
`;

const Image = styled(Err)`
  max-width: 100%;
`;

const ErrorPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Wrapper>
      <Image />
      <CustomLink to={!isAuthenticated ? '/' : '/dashboard'}>
        {!isAuthenticated ? 'Go Home' : 'Go to Dashboard'}
      </CustomLink>
    </Wrapper>
  );
};

export default ErrorPage;
