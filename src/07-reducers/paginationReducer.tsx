import reducerFunction from "@utils/reducerFunction";

export function paginationInit() {
  return {
    currentPage: 0,
    pageSize: 0,
    pages: 0,
    rows: [],
  };
}

interface PaginationPayloadInterface {
  currentPage: number;
  pageSize: number;
  pages: number;
  rows: any[];
}

export type PaginationActions =
  | "next_page"
  | "first_page"
  | "last_page"
  | "previous_page";
export interface ActionInterface {
  type: PaginationActions;
  payload?: PaginationPayloadInterface;
}

interface StateInterface {
  currentPage: number;
  pageSize: number;
  pages: number;
  rows: any[];
}

const cases = {
  next_page: (state: StateInterface, action: ActionInterface) => {
    return {
      pageSize: state.pageSize,
      currentPage: state.currentPage + 1,
      pages: state.pages,
      rows: action.payload?.rows,
    };
  },
  first_page: (state: StateInterface, action: ActionInterface) => {
    return {
      ...state,
      currentPage: 0,
      rows: action.payload?.rows,
    };
  },
  precious_page: (state: StateInterface, action: ActionInterface) => {
    return {
      ...state,
      currentPage: state.pages - 1,
      rows: action.payload?.rows,
    };
  },
  last_page: (state: StateInterface, action: ActionInterface) => {
    return {
      ...state,
      currentPage: action.payload?.currentPage,
      rows: action.payload?.rows,
    };
  },
};

export const paginationReducer = <StateInterface,>(
  state: StateInterface,
  action: ActionInterface
): StateInterface => {
  return reducerFunction(state, action, cases);
};
