import styled from 'styled-components';
import { CenterAllFlex, FlexProp } from './props/flex';

export const Base = styled.button`
  ${FlexProp}
  cursor: pointer;
  outline: none;
  border: none;
`;

export const BaseButton = styled(Base)`
  ${CenterAllFlex}
  background: none;
`;
