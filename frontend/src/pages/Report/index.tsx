import { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '@dispatch';
import { AppState } from '@reducers/index';
import { getReport, resetListState, setListMessage } from '@actions';

import {
  Wrapper,
  DateWrapper,
  LoadMoreButton,
  Table,
  CsvLink,
  TableWrapper,
  Paragraph,
} from './styled';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import SweetAlert from '@components/alert';

const reduxProps = createSelector(
  (state: AppState) => state.list.report,
  (state: AppState) => state.list.message,
  (state: AppState) => state.list.status,
  (report, message, status) => ({ report, message, status })
);

const Report = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { report, message, status } = useSelector(reduxProps);
  const dispatch = useThunkDispatch();

  const getReportAction = () => {
    dispatch(getReport({ startDate, endDate }));
  };

  const resetMessage = () => dispatch(setListMessage('', null));

  useEffect(() => {
    return () => {
      dispatch(resetListState());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <h1>Report</h1>
      <DateWrapper>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date(2021, 2, 10)}
          maxDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
        />
        <LoadMoreButton type="button" onClick={getReportAction}>
          Get Report
        </LoadMoreButton>
      </DateWrapper>
      {report.length > 0 && (
        <CsvLink data={report} filename="report.csv">
          Download CSV report
        </CsvLink>
      )}
      {!report.length && !message && <Paragraph>No Data</Paragraph>}
      {message && status === 200 && <Paragraph>{message}</Paragraph>}
      {message && status !== 200 && (
        <SweetAlert
          message={message}
          type="error"
          callBack={resetMessage}
          withButtons
          failedButton="Close"
          successButton="OK"
        />
      )}
      {report.length > 0 && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {report.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Wrapper>
  );
};

export default Report;
