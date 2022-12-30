import { counterReducer, counterInit } from "@reducers/countReducer";
import { useReducer } from "react";

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [state, dispatch] = useReducer(
    counterReducer,
    initialCount,
    counterInit
  );
  return (
    <div className="flex bg-dark text-m-light items-center flex-wrap flex-col w-[220px] justify-items-start rounded-md dark:text-light dark:bg-darker">
      <div className="h-[36px] flex items-center text-m-light">
        Count: &nbsp;
        <span className="text-m-blue">{state.count}</span>
      </div>
      <div className="flex flex-wrap">
        <button
          className="m-3 h-3 flex items-center"
          onClick={() => dispatch({ type: "reset", payload: initialCount })}
        >
          Reset
        </button>
        <button
          className="m-3 h-3 flex items-center justify-start"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </button>
        <button
          className="m-3 h-3 flex items-center justify-items-start"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
