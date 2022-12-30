import Toast from "@components/Toast";
import { toastReducer, toastInit } from "@reducers/toastReducer";
import { createContext, useContext } from "react";
import { useReducer } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

type ToastType = "success" | "error" | "warning" | "notification";

type ModalContextType = {
  showToast: (content: React.ReactNode, type: ToastType) => void;
  hideToast: () => void;
};

interface PayloadInterface {
  content: React.ReactNode | null;
  type: ToastType;
  show: boolean;
}

export const ToastContentContext = createContext<ModalContextType>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastContentProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, toastInit);

  const showToast = (content: React.ReactNode, type: ToastType) => {
    dispatch({
      type: `${type}_toast`,
      payload: { content, type, show: true },
    });
  };

  const hideToast = () => {
    dispatch({ type: "hide_toast" });
  };

  return (
    <ToastContentContext.Provider value={{ hideToast, showToast }}>
      {children}
      <Toast
        show={state.show}
        toastType={state.type}
        hideToast={hideToast}
        children={state.content}
        toastTimeOut={1200}
      />
    </ToastContentContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContentContext);
