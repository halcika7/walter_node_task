import styled from 'styled-components';
import { BaseButton, FlexColumn, setMarginPadding } from '@styled/components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.section`
  ${FlexColumn}
  ${setMarginPadding('0 0 2rem', '32px')}
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;

  h1 {
    margin: 0 0 2rem;
    font-size: 2rem;
  }

  overflow-x: scroll;
  overflow-y: hidden;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Table = styled.table`
  border-collapse: collapse;
  min-width: 500px;
  width: 100%;

  tbody > tr,
  thead > tr {
    height: 40px;

    td,
    th {
      border: 1px solid black;
      padding: 1rem;
      text-align: center;
    }
  }

  tbody > tr {
    td {
      &:nth-child(3) {
        vertical-align: middle;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          text-decoration: none;
          background: ${props => props.theme.bg.accent};
          height: 40px;
          width: 40px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-right: 1rem;
          align-self: center;
          border-radius: 50%;
          box-shadow: ${props => props.theme.boxShadow};

          > svg {
            height: 100%;
            width: 20px;
            color: white;

            path {
              fill: white;
            }
          }
        }
      }
    }
  }

  button {
    background: tomato;
    height: 40px;
    width: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
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
`;

export const LoadMoreButton = styled(BaseButton)`
  margin: 2rem 0;
  background: #6280df;
  padding: 0.7rem 2rem;
  color: white;
  width: 100%;
  box-shadow: ${props => props.theme.boxShadow};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Paragraph = styled.p`
  margin: 2rem 0;
`;

export const CustomLink = styled(Link)`
  background: #6280df;
  padding: 0.5rem 1rem;
  color: white;
  box-shadow: ${props => props.theme.boxShadow};
  margin: 2rem 0;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;
