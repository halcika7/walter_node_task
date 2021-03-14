import styled from 'styled-components';
// components
import {
  AlignCenterDiv,
  AlignCenterFlex,
  setHeightWidth,
} from '@styled/components';
import { Link } from 'react-router-dom';
// hooks
import { useAuth } from '@hooks/useAuth';

import { ReactComponent as Arrow } from '@images/left-arrow.svg';

const Wrapper = styled(AlignCenterDiv)`
  width: 100%;
  margin: 1rem 0;
`;

const CustomLink = styled(Link)`
  cursor: pointer;
  ${AlignCenterFlex};

  > svg {
    ${setHeightWidth('20px', '40px')}

    path {
      fill: ${props => props.theme.text.primary};
    }
  }

  > p {
    color: ${props => props.theme.text.primary};
    font-size: 0.9rem;
    font-weight: 400;
    margin-left: 8px;
  }
`;

const GoHomeArrow = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Wrapper>
      <CustomLink to={!isAuthenticated ? '/' : '/dashboard'}>
        <Arrow />
        <p>{!isAuthenticated ? 'Go Home' : 'Go to Dashboard'}</p>
      </CustomLink>
    </Wrapper>
  );
};

export default GoHomeArrow;
