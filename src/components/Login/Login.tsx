import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCognitoUser, getCurrentUser, checkSession, signIn } from "../../utils/auth";
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

  const history = useHistory()

  useEffect(() => {
    console.log(getCurrentUser())
    console.log('check')
    const loggedIn = userSession && checkSession(userSession)
    console.log(loggedIn)
    if(userSession && checkSession(userSession)){
      history.push("/")
    } 
  }, [userSession, history]);

  const onSubmit = async (formdata: { email: string; password: string }) => {
    setAuthFetchStatus(HttpRequestStatus.loading);
    try {
      const user = await signIn(formdata.email, formdata.password);
      setUser(getCognitoUser(formdata.email));
      setUserSession(user);
      setAuthFetchStatus(HttpRequestStatus.ready);
    } catch (err) {
      setAuthFetchStatus(HttpRequestStatus.error);
    }
  };

  return (
    <div className="signup">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;