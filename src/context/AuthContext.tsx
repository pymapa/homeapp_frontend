import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import React, { createContext, FunctionComponent, useState } from "react";
import { defaultFn } from "../utils/common";
import { HttpRequestStatus } from "../utils/http";

interface Context {
  user: CognitoUser | null;
  userSession: CognitoUserSession | null;
  authFetchStatus: HttpRequestStatus;

  setUser: (user: CognitoUser) => void;
  setUserSession: (userSession: CognitoUserSession) => void;
  setAuthFetchStatus: (status: HttpRequestStatus) => void;
}

const initialState: Context = {
  user: null,
  userSession: null,
  authFetchStatus: HttpRequestStatus.null,

  setUser: defaultFn,
  setUserSession: defaultFn,
  setAuthFetchStatus: defaultFn,
};

export const AuthContext = createContext<Context>(initialState);

const AuthProvider: FunctionComponent = (props) => {
  const [state, setState] = useState<Context>(initialState);

  const setUser = (user: CognitoUser) => {
    setState((prev: Context) => {
      return {
        ...prev,
        user
      }
    });
  };

  const setUserSession = (userSession: CognitoUserSession) => {
    setState((prev: Context) => {
      return {
        ...prev,
        userSession
      }
    })
  }

  const setAuthFetchStatus = (status: HttpRequestStatus) => {
    setState((prev: Context) => {
      return {
        ...prev,
        authFetchStatus: status,
      };
    });
  };

  const initState: Context = {
    ...state,
    setUser,
    setUserSession,
    setAuthFetchStatus,
  };

  return (
    <AuthContext.Provider value={initState}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
