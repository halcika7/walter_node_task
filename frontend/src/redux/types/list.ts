export enum ListTypes {
  SET_LIST = '@@LIST/SET_LIST',
  SET_LISTS = '@@LIST/SET_LISTS',
  SET_REPORT = '@@LIST/SET_REPORT',
  LOAD_MORE = '@@LIST/LOAD_MORE',
  SET_LOADING = '@@LIST/SET_LOADING',
  SET_NUMBER_OF_LISTS = '@@LIST/SET_NUMBER_OF_LISTS',
  SET_MESSAGE = '@@LIST/SET_MESSAGE',
  SET_ERRORS = '@@LIST/SET_ERRORS',
  CLEAR_ERRORS = '@@LIST/CLEAR_ERRORS',
  RESET_STATE = '@@LIST/RESET_STATE',
}

export interface Item {
  name: string;
  qty: number;
  uuid: string;
}

export interface ListItemError {
  name: string;
  qty: string;
}

export interface PostListData {
  name: string;
  items: Item[];
}

export interface ListErrors {
  name: string;
  items: ListItemError[];
}

export interface List {
  _id: string;
  name: string;
  createdAt: string;
}

export interface ListState {
  message: string;
  errors: ListErrors;
  loading: boolean;
  status: number | null;
  numberOfLists: number;
  list: PostListData;
  lists: List[];
  report: ListItemError[];
}

interface SetList {
  type: typeof ListTypes.SET_LIST;
  payload: { list: PostListData };
}

interface SetLists {
  type: typeof ListTypes.SET_LISTS | typeof ListTypes.LOAD_MORE;
  payload: { lists: List[] };
}

interface SetReport {
  type: typeof ListTypes.SET_REPORT;
  payload: { report: ListItemError[] };
}

interface SetErrors {
  type: typeof ListTypes.SET_ERRORS;
  payload: { errors: ListErrors };
}

interface SetMessage {
  type: typeof ListTypes.SET_MESSAGE;
  payload: { message: string; status: number | null };
}

interface ClearErrors {
  type: typeof ListTypes.CLEAR_ERRORS;
}

interface SetNumberOfLists {
  type: typeof ListTypes.SET_NUMBER_OF_LISTS;
  payload: { numberOfLists: number };
}

interface SetLoading {
  type: typeof ListTypes.SET_LOADING;
  payload: { loading: boolean };
}

interface ResetState {
  type: typeof ListTypes.RESET_STATE;
}

export type ListActionTypes =
  | SetList
  | SetErrors
  | SetMessage
  | ClearErrors
  | SetNumberOfLists
  | SetLoading
  | SetReport
  | ResetState
  | SetLists;
