import styled, { css, keyframes } from 'styled-components';
import { setHeightWidth } from '@styled/components';

export const rotatePlaceholder = keyframes`
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
`;

export const animateSuccessLong = keyframes`
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
`;

export const animateSuccessTip = keyframes`
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
`;

const BaseIcon = styled.div`
  ${setHeightWidth('80px')};
  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  padding: 0;
  position: relative;
  box-sizing: content-box;
  margin: 20px auto 40px;
`;

const Span = styled.span`
  height: 5px;
  background-color: #a5dc86;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
`;

export const SuccessIcon = styled(BaseIcon)`
  border-color: #a5dc86;

  &::before,
  &::after {
    content: '';
    position: absolute;
    ${setHeightWidth('120px', '60px')};
    background: ${props => props.theme.colors.white};
    transform: rotate(-45deg);
  }

  &::before {
    border-radius: 120px 0 0 120px;
    top: -11px;
    left: -33px;
    transform-origin: 60px 60px;
  }

  &::after {
    border-radius: 0 120px 120px 0;
    top: -8px;
    left: 30px;
    transform-origin: 0 60px;
    animation: ${rotatePlaceholder} 4.25s ease-in;
  }
`;

export const ErrorIcon = styled(BaseIcon)`
  border-color: #f27474;
`;

export const SpanLong = styled(Span)`
  width: 47px;
  right: 8px;
  top: 38px;
  transform: rotate(-45deg);
  animation: ${animateSuccessLong} 0.75s;
`;

export const SpanTip = styled(Span)`
  width: 25px;
  left: 14px;
  top: 46px;
  transform: rotate(45deg);
  animation: ${animateSuccessTip} 0.75s;
`;

export const Ring = styled.div`
  ${setHeightWidth('80px')};
  border: 4px solid hsla(98, 55%, 69%, 0.2);
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
`;

export const Corners = styled.div`
  ${setHeightWidth('90px', '5px')};
  background-color: ${props => props.theme.colors.white};
  padding: 1px;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  transform: rotate(-45deg);
`;

export const SpanMark = styled.span`
  position: relative;
  display: block;
`;

export const SpanLine = styled.span<{ left?: boolean }>`
  ${setHeightWidth('5px', '47px')};
  position: absolute;
  background-color: #f27474;
  display: block;
  top: 37px;
  border-radius: 2px;

  ${props =>
    props.left &&
    css`
      transform: rotate(45deg);
      left: 17px;
    `}

  ${props =>
    !props.left &&
    css`
      transform: rotate(-45deg);
      left: 16px;
    `}
`;
