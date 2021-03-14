import styled, { keyframes } from 'styled-components';
import { setHeightWidth } from '@styled/components';

export const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  ${setHeightWidth('2em')}
  border-radius: 50%;
  font-size: 10px;
  position: relative;
  margin-left: 0.5rem;
  text-indent: -9999em;
  border-top: 0.3em solid rgba(255, 255, 255, 0.2);
  border-right: 0.3em solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.3em solid rgba(255, 255, 255, 0.2);
  border-left: 0.3em solid ${props => props.theme.text.primary};
  animation: ${Animation} 1.4s infinite linear;
  transform: translateZ(0);

  &:after {
    ${setHeightWidth('1em')}
    border-radius: 50%;
  }
`;

const ButtonSpinner = () => <Wrapper />;

export default ButtonSpinner;
