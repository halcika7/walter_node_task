import styled from 'styled-components';
import { BaseButton, AlignCenterDiv, BaseLink } from '@styled/components';

export const ContainerWrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 150px;
`;

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 54px;
  margin: 0 0 1rem;
  letter-spacing: 0px;
`;

export const Paragraph = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.6;
  margin-bottom: 3rem;
  line-height: 22px;
`;

export const Wrapper = styled.section`
  flex-basis: 35%;
  margin-left: 2rem;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-basis: 100%;
    margin-left: 0;

    > p {
      max-width: 400px;
    }
  }
`;

export const ImageWrapper = styled.div`
  flex-basis: 60%;

  > svg {
    width: 100%;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

export const LightWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  > a,
  > small {
    text-decoration: none;
    opacity: 0.7;
    margin-left: auto;
    font-size: 0.8rem;
    color: #f5f5f5;
    font-weight: 300;
    letter-spacing: 0.3px;
  }

  > a {
    @media (max-width: 991px) {
      margin-left: 0;
    }
  }

  > small {
    margin-left: 0;
  }
`;

export const ButtonsWrapper = styled(AlignCenterDiv)`
  margin: 2rem 0;
`;

export const SubmitButton = styled(BaseButton)`
  border-radius: 30px;
  background-color: ${props => props.theme.bg.accent};
  color: ${props => props.theme.colors.white};
  padding: 8px 24px;
  font-size: 0.9rem;
  font-weight: 400;
  width: auto;
  box-shadow: ${props => props.theme.boxShadow};
  transition: box-shadow 0.3 ease-in-out;

  &:active {
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const LinkButton = styled(BaseLink)`
  margin-left: 8px;
  border-radius: 30px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  padding: 8px 24px;
  font-size: 0.9rem;
  font-weight: 300;
  box-shadow: ${props => props.theme.boxShadow};
`;
