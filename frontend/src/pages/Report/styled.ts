import styled from 'styled-components';
import { BaseButton, FlexColumn, setMarginPadding } from '@styled/components';
import { CSVLink } from 'react-csv';

export const Wrapper = styled.section`
  ${FlexColumn}
  ${setMarginPadding('0 0 2rem', '32px')}
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;
  min-height: 500px;

  h1 {
    margin: 0 0 2rem;
    font-size: 2rem;
  }
`;

export const LoadMoreButton = styled(BaseButton)`
  background: #6280df;
  padding: 0.5rem 0rem;
  color: white;
  width: 100%;
  box-shadow: ${props => props.theme.boxShadow};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const DateWrapper = styled.div`
  display: flex;

  > div {
    margin-right: 2rem;

    input {
      height: 40px;
    }
  }

  .react-datepicker__tab-loop {
    margin: 0;
  }

  .react-datepicker__input-container input {
    background: ${props => props.theme.bg.sidebar};
    border: none;
    color: ${props => props.theme.text.primary};
    outline: none;
    box-shadow: ${props => props.theme.boxShadow};
    padding-left: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      margin: 1rem 0 0;

      input {
        width: 100%;
      }
    }

    ${LoadMoreButton} {
      margin-top: 1rem;
    }
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Table = styled.table`
  border-collapse: collapse;
  min-width: 500px;
  margin: 2rem 0;
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
`;

export const CsvLink = styled(CSVLink)`
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

export const Paragraph = styled.p`
  margin: 2rem 0;
`;
