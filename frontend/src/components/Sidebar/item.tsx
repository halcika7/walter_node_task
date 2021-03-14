import styled, { css } from 'styled-components';
import NavLink from '../NavLink';
import { CenterAllFlex, FlexColumn, setHeightWidth } from '@styled/components';

// hooks
import { useLocation } from 'react-router-dom';
import { FunctionComponent, FC } from 'react';

const CustomizedLink = styled(NavLink)<{ active?: string }>`
  ${CenterAllFlex}
  ${FlexColumn}
  padding: 32px 16px;
  width: 100%;
  color: ${props => props.theme.text.primary};
  cursor: pointer;

  @media (max-width: 992px) {
    padding: 16px;
  }

  > svg {
    ${setHeightWidth('32px', '100%')}

    > g > g > path {
      fill: ${props => props.theme.text.primary};
    }

    path {
      fill: ${props => props.theme.text.primary};
    }
  }

  > p {
    margin-top: 1rem;
    color: ${props => props.theme.text.primary};
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  @media (max-width: 992px) {
    padding: 16px;

    > svg {
      ${setHeightWidth('24px', '100%')}
    }
  }

  ${props =>
    props.active === 'true' &&
    css`
      background: ${props => props.theme.bg.accent};

      > p {
        color: ${props => props.theme.colors.white};
      }

      > svg {
        color: ${props => props.theme.colors.white};
        > g > g > path {
          fill: ${props => props.theme.colors.white};
        }

        path {
          fill: ${props => props.theme.colors.white};
        }
      }
    `};
`;

interface Props {
  to: string;
  Icon: FunctionComponent;
  title: string;
}

const Item: FC<Props> = ({ to, title, Icon }) => {
  const { pathname } = useLocation();
  return (
    <CustomizedLink active={pathname === to ? 'true' : 'false'} to={to}>
      <Icon />
      <p>{title}</p>
    </CustomizedLink>
  );
};

export default Item;
