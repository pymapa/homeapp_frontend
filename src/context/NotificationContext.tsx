import { createContext, FunctionComponent, useState } from "react";
import { defaultFn } from "../utils/common";

interface Context {
  toasts: ToastNotification[];

  addToast: (toast: ToastNotification) => void;
  removeToast: (id: string) => void;
}

const initialState: Context = {
  toasts: [
    // {
    //   id: "12345",
    //   timer: 5000,
    //   text: "Test message",
    //   type: "success",
    // },
    // {
    //   id: "12346",
    //   timer: 4000,
    //   text: "Test message",
    //   type: "info",
    // },
    // {
    //   id: "12347",
    //   timer: 3000,
    //   text: "Test message",
    //   type: "warning",
    // },
    // {
    //   id: "12348",
    //   timer: 2000,
    //   text: "Test message",
    //   type: "error",
    // },
  ],

  addToast: defaultFn,
  removeToast: defaultFn
};

export const NotificationContext = createContext<Context>(initialState);

const NotificationProvider: FunctionComponent = (props) => {
  const [state, setState] = useState<Context>(initialState);

  const addToast = (toast: ToastNotification) => {
    setState((prev: Context) => {
      return {
        ...prev,
        toasts: [...prev.toasts, toast],
      };
    });
  };

  const removeToast = (id: string) => {
    setState((prev: Context) => {
      return {
        ...prev,
        toasts: prev.toasts.filter((toast) => toast.id !== id)
      }
    })
  }

  const initState: Context = {
    ...state,
    addToast,
    removeToast
  };
  return (
    <NotificationContext.Provider value={initState}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider