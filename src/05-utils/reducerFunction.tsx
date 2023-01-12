import { CounterActions } from "@reducers/countReducer";
import { ToastActions } from "@reducers/toastReducer";
import { PaginationActions } from "@reducers/paginationReducer";

interface ActionInterface {
  type: CounterActions | ToastActions | PaginationActions;
  payload?: any;
}

type CasesInterface = {
  [key in CounterActions | ToastActions | PaginationActions]: <S>(
    state: S,
    action: ActionInterface
  ) => S;
};

const reducerFunction = <S,>(
  state: S,
  action: ActionInterface,
  cases: CasesInterface
): S => {
  const caseFn = cases[action.type];
  return caseFn ? caseFn(state, action) : state;
};

export default reducerFunction;
