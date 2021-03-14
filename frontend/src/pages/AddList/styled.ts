import styled from 'styled-components';
import { BaseButton, FlexColumn, setMarginPadding } from '@styled/components';

export const Wrapper = styled.section`
  ${FlexColumn}
  ${setMarginPadding('0 0 2rem', '32px')}
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;

  h1 {
    margin: 0 0 2rem;
    font-size: 2rem;
  }
`;

export const ItemsWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin: 1rem 0 2rem;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.bg.accent};
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;

  > div {
    margin-right: 2rem;
  }

  > button {
    background: tomato;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${props => props.theme.boxShadow};

    > svg {
      height: 100%;
      width: 16px;
      color: white;

      path {
        fill: white;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;

    > div {
      margin-right: 0;
    }

    > button {
      order: -1;
      width: 100%;
    }
  }
`;

export const AddItemButton = styled(BaseButton)`
  margin: 1rem 0;
  background: #6280df;
  padding: 0.7rem 2rem;
  color: white;
  width: 170px;
  box-shadow: ${props => props.theme.boxShadow};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SubmitButton = styled(AddItemButton)`
  background: #aaf0d1;
  margin-top: 2rem;
  color: #111;
`;
