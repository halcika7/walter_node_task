import styled, { css } from 'styled-components';
import {
  FlexProp,
  FlexRow,
  CenterAllFlex,
  AlignCenterFlex,
  JustifyCenterFlex,
} from './props/flex';

export const Flex = styled.div`
  ${FlexProp}
`;

export const CenterDiv = styled.div`
  ${CenterAllFlex}
`;

export const ColumnDiv = styled(Flex)`
  flex-direction: column;
`;

export const JustifyCenterDiv = styled.div`
  ${JustifyCenterFlex}
`;

export const AlignCenterDiv = styled.div`
  ${AlignCenterFlex}
`;

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  ${FlexRow}
`;

export const CenterColumn = styled(ColumnDiv)`
  ${JustifyCenterFlex}
`;

export const ErrorDiv = styled.div<{ Color?: string; small?: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.7rem 0;
  color: ${props => (props.Color ? props.Color : 'tomato')};

  ${props =>
    props.small &&
    css`
      font-size: 0.75rem;
    `}
`;
