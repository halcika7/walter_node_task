import styled, { keyframes } from 'styled-components';
import { CenterDiv, setHeightWidth } from '@styled/components';

export const Animation = keyframes`
    0%, 70%, 100% {
        transform: scale3D(1, 1, 1);
    } 
    35% {
        transform: scale3D(0, 0, 1);
    }
`;

const CubeWrapper = styled.div`
  ${setHeightWidth('60px')}
  margin-top: -7rem;

  > div:nth-child(7) {
    animation-delay: 0s;
  }

  > div:nth-child(4),
  > div:nth-child(8) {
    animation-delay: 0.1s;
  }

  > div:nth-child(1),
  > div:nth-child(5),
  > div:nth-child(9) {
    animation-delay: 0.2s;
  }

  > div:nth-child(2),
  > div:nth-child(6) {
    animation-delay: 0.3s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Cube = styled.div`
  ${setHeightWidth('33%')}
  background-color: ${props => props.theme.bg.accent};
  float: left;
  animation: ${Animation} 1.3s infinite ease-in-out;
`;

const Wrapper = styled(CenterDiv)`
  ${setHeightWidth('100%')}
  position: fixed;
  top: 0;
  left: 0;
`;

const Spinner = () => (
  <Wrapper>
    <CubeWrapper>
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
    </CubeWrapper>
  </Wrapper>
);

export default Spinner;
