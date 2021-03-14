import styled, { css, keyframes } from 'styled-components';
import {
  BaseButton,
  CenterDiv,
  ColumnDiv,
  JustifyCenterDiv,
  setHeightWidth,
} from '@styled/components';

export const ShowSweetAlert = keyframes`
0% {
  transform: scale(0.7);
  -webkit-transform: scale(0.7);
}
45% {
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
}
80% {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
}
100% {
  transform: scale(1);
  -webkit-transform: scale(1);
}
`;

export const SweetAlertWrapper = styled(CenterDiv)`
  ${setHeightWidth('100vh', '100%')};
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
`;

export const Backdrop = styled.div`
  ${setHeightWidth('100vh', '100%')};
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Alert = styled(ColumnDiv)`
  min-width: 200px;
  max-width: 400px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  color: rgba(0, 0, 0, 0.64);
  border-radius: 5px;
  padding: 1rem 2rem;
  text-align: center;
  animation: ${ShowSweetAlert} 0.3s;
  z-index: 1001;
`;

export const Buttons = styled(JustifyCenterDiv)`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Button = styled(BaseButton)<{ success?: boolean }>`
  width: 150px;
  border: 1px solid red;
  padding: 0.5rem 0;
  border-radius: 5px;

  ${props =>
    props.success &&
    css`
      border: 1px solid #66bb6a;
      background: #66bb6a;
      color: ${props => props.theme.colors.white};
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.125s ease-in;

      &:hover {
        box-shadow: none;
      }
    `}

  @media (max-width: 400px) {
    width: 100%;

    &:nth-child(1) {
      margin-bottom: 1rem;
    }
  }
`;
