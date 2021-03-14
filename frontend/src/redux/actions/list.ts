import { axios } from '@axios';
import {
  PostListData,
  ListActionTypes,
  ListTypes,
  ListItemError,
  ListErrors,
  List,
} from '@ctypes/list';
import { AppThunkDispatch } from '@dispatch';
import { AppState } from '@reducers/index';

export const setListMessage = (
  message: string,
  status: number | null
): ListActionTypes => ({
  type: ListTypes.SET_MESSAGE,
  payload: { message, status },
});

export const setListErrors = (errors: ListErrors): ListActionTypes => ({
  type: ListTypes.SET_ERRORS,
  payload: { errors },
});

export const clearListErrors = (): ListActionTypes => ({
  type: ListTypes.CLEAR_ERRORS,
});

const addUpdateList = (
  dispatch: AppThunkDispatch,
  data: { errors: Record<string, string>; message: string },
  status: number
) => {
  dispatch(setListErrors({ items: [], name: '' }));

  if (data.errors) {
    const errors = [] as ListItemError[];

    Object.entries(data.errors).forEach(([key, value]) => {
      if (key.includes('items')) {
        const index = key.split('items')[1].split('.');
        const propName = index[1] as 'name' | 'qty';
        const propIndex = parseInt(index[0].slice(1, 2), 10);

        const hasError = errors[propIndex];

        if (!hasError) {
          errors[propIndex] = ({
            [propName]: value,
          } as unknown) as ListItemError;
        } else {
          hasError[propName] = value as string;
        }
      }
    });

    return dispatch(
      setListErrors({ items: errors, name: data.errors.name ?? '' })
    );
  }

  dispatch(clearListErrors());

  return dispatch(setListMessage(data.message, status));
};

export const addNewList = (listData: PostListData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post('/list/', listData);

  addUpdateList(dispatch, data, status);
};

export const updateList = (id: string, listData: PostListData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.put(`/list/${id}`, listData);
  addUpdateList(dispatch, data, status);
};

export const getTotalNumberOfLists = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get('/list/number-of-lists');
  return dispatch({
    type: ListTypes.SET_NUMBER_OF_LISTS,
    payload: { numberOfLists: data.numberOfLists ?? 0 },
  });
};

export const getLists = (skip: number, loadMore = false) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch({ type: ListTypes.SET_LOADING, payload: { loading: true } });

  const { data } = await axios.get(`/list/lists/${skip}`);

  return dispatch({
    type: !loadMore ? ListTypes.SET_LISTS : ListTypes.LOAD_MORE,
    payload: { lists: data.lists ?? [] },
  });
};

export const getList = (id: string) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.get(`/list/${id}`);
  if (data.list) {
    dispatch({
      type: ListTypes.SET_LIST,
      payload: { list: data.list },
    });
  } else {
    dispatch(setListMessage(data.message, status));
  }
};

export const deleteList = (id: string) => async (
  dispatch: AppThunkDispatch,
  getState: () => void
) => {
  const { data, status } = await axios.delete(`/list/${id}`);
  dispatch(setListMessage(data.message, status));

  if (status === 200) {
    const newLists = ((getState() as unknown) as AppState).list.lists.filter(
      (item: List) => item._id !== id
    );
    dispatch({
      type: ListTypes.SET_NUMBER_OF_LISTS,
      payload: {
        numberOfLists: ((getState() as unknown) as AppState).list.numberOfLists,
      },
    });
    dispatch({
      type: ListTypes.SET_LISTS,
      payload: { lists: newLists },
    });
  }
};

export const getReport = (dates: { startDate: Date; endDate: Date }) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch({ type: ListTypes.SET_LOADING, payload: { loading: true } });

  const { data, status } = await axios.get(`/list/report`, { params: dates });
  dispatch(setListMessage(data.message, status));
  dispatch({
    type: ListTypes.SET_REPORT,
    payload: { report: data.report ?? [] },
  });
};

export const resetListState = (): ListActionTypes => ({
  type: ListTypes.RESET_STATE,
});
