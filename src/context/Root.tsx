import React, { FunctionComponent } from "react";
import AuthProvider from "./AuthContext";

const RootProvider: FunctionComponent = (props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default RootProvider;
