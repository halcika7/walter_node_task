import { useEffect, useState } from 'react';
import { useThunkDispatch } from '@dispatch';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// types
import { AppState } from '@reducers/index';

import {
  getLists,
  getTotalNumberOfLists,
  setListMessage,
  deleteList,
  resetListState,
} from '@actions';

// components
import { ReactComponent as XImage } from '@images/remove.svg';
import { ReactComponent as Eye } from '@images/eye.svg';

import {
  Wrapper,
  Table,
  LoadMoreButton,
  TableWrapper,
  Paragraph,
  CustomLink,
} from './styled';
import { Link } from 'react-router-dom';
import { BaseButton } from '@styled/components';
import ButtonSpinner from '@components/spinner/buttonSpinner';
import SweetAlert from '@components/alert';

const reduxProps = createSelector(
  (state: AppState) => state.list.lists,
  (state: AppState) => state.list.numberOfLists,
  (state: AppState) => state.list.loading,
  (state: AppState) => state.list.message,
  (state: AppState) => state.list.status,
  (...props) => props
);

const Lists = () => {
  const dispatch = useThunkDispatch();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [lists, numberOfLists, loading, message, status] = useSelector(
    reduxProps
  );

  const deleteListAction = (id: string) => () => {
    if (isDeleting) return;
    setIsDeleting(true);
    dispatch(deleteList(id));
  };

  const resetMessage = () => {
    dispatch(setListMessage('', null));
  };

  const loadMore = () => {
    if (loading || lists.length >= numberOfLists) return;
    dispatch(getLists(lists.length, true));
  };

  useEffect(() => {
    dispatch(getTotalNumberOfLists);
    dispatch(getLists(0));

    return () => {
      dispatch(resetListState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      setIsDeleting(false);
    }
  }, [status]);

  return (
    <Wrapper>
      <h1>Shopping Lists</h1>
      {message && (
        <SweetAlert
          message={message}
          type={status === 200 ? 'success' : 'error'}
          callBack={resetMessage}
          withButtons
          failedButton="Close"
          successButton="OK"
        />
      )}
      {!lists.length && !loading && (
        <>
          <Paragraph>You don&apos;t have any shopping list</Paragraph>
          <CustomLink to="/add-list">Create first Shopping List</CustomLink>
        </>
      )}
      {lists.length > 0 && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Creation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map(list => (
                <tr key={list._id}>
                  <td>{list.name}</td>
                  <td>{new Date(list.createdAt).toLocaleString()}</td>
                  <td>
                    <div>
                      <Link to={`/edit-list/${list._id}`}>
                        <Eye />
                      </Link>
                      <BaseButton
                        type="button"
                        onClick={deleteListAction(list._id)}
                        disabled={isDeleting}
                      >
                        <XImage />
                      </BaseButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
      {lists.length < numberOfLists && (
        <LoadMoreButton type="button" onClick={loadMore} disabled={loading}>
          Load More {loading && <ButtonSpinner />}
        </LoadMoreButton>
      )}
    </Wrapper>
  );
};

export default Lists;
