import reducerFunction from "@utils/reducerFunction";

export function toastInit() {
  return {
    show: false,
    type: "none",
    content: null,
  };
}

interface ToastPayloadInterface {
  content: React.ReactNode | null;
  type: "success" | "error" | "warning" | "notification" | "none";
  show: boolean;
}

export type ToastActions =
  | "success_toast"
  | "notification_toast"
  | "warning_toast"
  | "error_toast"
  | "hide_toast";
export interface ActionInterface {
  type: ToastActions;
  payload?: ToastPayloadInterface;
}

const cases = {
  success_toast: <S,>(state: S, action: ActionInterface) => {
    return action.payload;
  },
  notification_toast: <S,>(state: S, action: ActionInterface) => {
    return action.payload;
  },
  warning_toast: <S,>(state: S, action: ActionInterface) => {
    return action.payload;
  },
  error_toast: <S,>(state: S, action: ActionInterface) => {
    return action.payload;
  },
  hide_toast: <S,>(state: S, action: ActionInterface) => {
    return toastInit();
  },
};

export const toastReducer = <S,>(state: S, action: ActionInterface): S => {
  return reducerFunction(state, action, cases);
};
