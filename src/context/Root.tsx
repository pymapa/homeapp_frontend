import React, { FunctionComponent } from "react";
import AuthProvider from "./AuthContext";
import NotificationProvider from "./NotificationContext";

const RootProvider: FunctionComponent = (props) => {
  return (
    <NotificationProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </NotificationProvider>
  );
};

export default RootProvider;
