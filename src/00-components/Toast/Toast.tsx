import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface Props {
  show: boolean;
  hideToast: () => void;
  children: React.ReactNode;
  toastTimeOut?: number;
  toastType?: "success" | "error" | "warning" | "info" | null;
}

const Toast = ({
  show,
  hideToast,
  children,
  toastTimeOut,
  toastType,
}: Props) => {
  console.log(
    {
      show,
      hideToast,
      children,
      toastTimeOut,
      toastType,
    },
    "toast component data"
  );
  const [node] = useState(document.createElement("div"));

  const removeNode = () => {
    if (document.querySelector("#toast")?.children.length) {
      document.querySelector("#toast")?.childNodes[0].remove();
    }
  };
  const handleToastType = () => {
    switch (toastType) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  useEffect(() => {
    if (show) {
      document
        .querySelector("#toast")
        ?.appendChild(node)
        .classList.add(
          "rounded-md",
          "text-white",
          "p-4",
          "m-4",
          "fixed",
          "bottom-0",
          "right-0",
          handleToastType()
        );
      setTimeout(() => {
        removeNode();
        hideToast();
      }, toastTimeOut || 3000);
    } else {
      removeNode();
    }

    return () => removeNode();
  }, [node, children, show]);

  return ReactDOM.createPortal(children, node);
};

export default Toast;
