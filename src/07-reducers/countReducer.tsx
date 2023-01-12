import reducerFunction from "@utils/reducerFunction";

export function counterInit(initialCount: number) {
  return { count: initialCount };
}

export type CounterActions = "increment" | "decrement" | "reset";

export interface ActionInterface {
  type: CounterActions;
  payload?: number;
}

interface CounterState {
  count: number;
}

const cases = {
  increment: (state: CounterState, action: ActionInterface) => {
    return { count: state.count + 1 };
  },
  decrement: (state: CounterState, action: ActionInterface) => {
    return { count: state.count - 1 };
  },
  reset: (state: CounterState, action: ActionInterface) => {
    return counterInit(action.payload!!);
  },
};

export const counterReducer = (
  state: CounterState,
  action: ActionInterface
): CounterState => {
  return reducerFunction(state, action, cases);
};
