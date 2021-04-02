import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import React, { createContext, FunctionComponent, useState } from "react";
import { defaultFn } from "../utils/common";
import { HttpRequestStatus } from "../utils/http";

interface Context {
  user: CognitoUser | null;
  userAttributes: CognitoUserAttribute[] | null;
  userSession: CognitoUserSession | null;
  authFetchStatus: HttpRequestStatus;

  setUser: (user: CognitoUser | null) => void;
  setUserAttributes: (userAttributes: CognitoUserAttribute[] | null) => void;
  setUserSession: (userSession: CognitoUserSession | null) => void;
  setAuthFetchStatus: (status: HttpRequestStatus) => void;
}

const initialState: Context = {
  user: null,
  userAttributes: [],
  userSession: null,
  authFetchStatus: HttpRequestStatus.null,

  setUser: defaultFn,
  setUserAttributes: defaultFn,
  setUserSession: defaultFn,
  setAuthFetchStatus: defaultFn,
};

export const AuthContext = createContext<Context>(initialState);

const AuthProvider: FunctionComponent = (props) => {
  const [state, setState] = useState<Context>(initialState);

  const setUser = (user: CognitoUser | null) => {
    setState((prev: Context) => {
      return {
        ...prev,
        user,
      };
    });
  };

  const setUserAttributes = (userAttributes: CognitoUserAttribute[] | null) => {
    setState((prev: Context) => {
      return {
        ...prev,
        userAttributes,
      };
    });
  };

  const setUserSession = (userSession: CognitoUserSession | null) => {
    setState((prev: Context) => {
      return {
        ...prev,
        userSession,
      };
    });
  };

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
    setUserAttributes,
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
