import { ListActionTypes, ListState, ListTypes } from '@ctypes/list';

const INITIAL_STATE: ListState = {
  message: '',
  errors: {
    name: '',
    items: [],
  },
  loading: false,
  status: null,
  list: {
    name: '',
    items: [],
  },
  numberOfLists: 0,
  lists: [],
  report: [],
};

export const ListReducer = (state = INITIAL_STATE, action: ListActionTypes) => {
  switch (action.type) {
    case ListTypes.SET_LOADING:
    case ListTypes.SET_NUMBER_OF_LISTS:
    case ListTypes.SET_ERRORS:
    case ListTypes.SET_MESSAGE:
    case ListTypes.SET_LIST: {
      return { ...state, ...action.payload };
    }
    case ListTypes.SET_REPORT:
    case ListTypes.SET_LISTS: {
      return { ...state, ...action.payload, loading: false };
    }
    case ListTypes.LOAD_MORE: {
      return {
        ...state,
        lists: [...state.lists, ...action.payload.lists],
        loading: false,
      };
    }
    case ListTypes.CLEAR_ERRORS: {
      return {
        ...state,
        errors: INITIAL_STATE.errors,
        message: '',
        status: null,
      };
    }
    case ListTypes.RESET_STATE: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
