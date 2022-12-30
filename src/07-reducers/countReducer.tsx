import reducerFunction from "@utils/reducerFunction";

export function counterInit(initialCount: number) {
  return { count: initialCount };
}

export type CounterActions = "increment" | "decrement" | "reset";

export interface ActionInterface {
  type: CounterActions;
  payload?: number;
}

const cases = {
  increment: (state: any, action: ActionInterface) => {
    return { count: state.count + 1 };
  },
  decrement: (state: any, action: ActionInterface) => {
    return { count: state.count - 1 };
  },
  reset: (state: any, action: ActionInterface) => {
    return counterInit(action.payload!!);
  },
};

export const counterReducer = (state: any, action: ActionInterface): any => {
  return reducerFunction(state, action, cases);
};
