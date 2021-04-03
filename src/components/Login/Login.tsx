import cuid from "cuid";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import { getCognitoUser, isValidSession, signIn } from "../../utils/auth";
import { HttpRequestStatus } from "../../utils/http";
import "./login.scss";
import LoginForm from "./LoginForm";

interface Props {}

const Login = (props: Props) => {
  const {
    userSession,
    setUser,
    setUserSession,
    setAuthFetchStatus,
  } = useContext(AuthContext);

  const { addToast } = useContext(NotificationContext);

  const history = useHistory();

  useEffect(() => {
    const loggedIn = userSession && isValidSession(userSession);
    if (loggedIn) {
      history.push("/");
    }
  }, [userSession, history]);

  const onSubmit = async (formdata: { email: string; password: string }) => {
    setAuthFetchStatus(HttpRequestStatus.loading);
    try {
      const user = await signIn(formdata.email, formdata.password);
      setUser(getCognitoUser(formdata.email));
      setUserSession(user);
      setAuthFetchStatus(HttpRequestStatus.ready);
      addToast({
        text: 'Welcome!',
        id: cuid(),
        timer: 5000,
        type: "success"
      })
    } catch (err) {
      addToast({
        text: err.message,
        id: cuid(),
        timer: 5000,
        type: "error"
      })
      setAuthFetchStatus(HttpRequestStatus.error);
    }
  };

  return (
    <div className="authentication layout__content">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
