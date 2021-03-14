import styled, { css, keyframes } from 'styled-components';

export const SkeletonWrapper = styled.div<{ Justify?: string }>`
  position: relative;
  overflow: hidden;
  width: auto;
  display: flex;
  justify-content: ${props => (props.Justify ? props.Justify : 'flex-end')};
`;

export const ImageSkeleton = styled.div<{ radius: number }>`
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  border-radius: 50%;
  background: ${props => props.theme.bg.skeleton};
  position: relative;
  overflow: hidden;

  .shimmer {
    top: ${props => `-${props.radius / 2}px`};
    div {
      height: ${props => `${props.radius + 300}px`};
    }
  }
`;

export const Line = styled.div<{
  Height: number;
  Width: number;
  marginTop?: string;
  Radius?: string;
}>`
  height: ${props => `${props.Height}px`};
  max-width: 100%;
  width: ${props => `${props.Width}px`};
  background: ${props => props.theme.bg.skeleton};
  position: relative;
  overflow: hidden;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
  border-radius: ${props => (props.Radius ? props.Radius : 0)};

  .shimmer {
    div {
      height: 300px;
    }
  }

  ${props =>
    props.Height > props.Width &&
    css`
      .shimmer {
        div {
          height: ${props.Height + 300}px;
        }
      }
    `};
`;

export const Animation = keyframes`
  0% {
    transform: translateX(-150%);
  }
  50% {
    transform: translateX(-60%)
  }
  100% {
    transform: translateX(150%);
  }
`;

export const Shimmer = styled.div`
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${Animation} 2.5s infinite;

  > div {
    width: 50%;
    height: 100%;
    background: ${props => props.theme.bg.skeletonAnimation};
    transform: skewY(-70deg);
  }
`;

export const Spacer = styled.div<{ Margin?: string }>`
  margin: ${props => (props.Margin ? props.Margin : '0.5rem 0')};
`;
