import React, { useContext, useEffect } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ToastMessages.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ToastProps {
  toast: ToastNotification;
}

const Toast = ({ toast }: ToastProps) => {
  const { removeToast } = useContext(NotificationContext);
  useEffect(() => {
    if (toast.timer) {
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.timer);
    }
  });
  return (
  <div className={`toast toast--${toast.type}`}>
    <button onClick={() => removeToast(toast.id)} className="toast__close">
      <FontAwesomeIcon icon={faTimes} />
    </button>
    {toast.text}
  </div>
  )
};

const ToastMessages = () => {
  const { toasts } = useContext(NotificationContext);

  return (
    <TransitionGroup className="toasts">
      {toasts.map((toast) => {
        return (
          <CSSTransition key={toast.id} timeout={300} classNames="toast-">
            <Toast toast={toast} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default ToastMessages;
