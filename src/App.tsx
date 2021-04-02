import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import RootProvider from "./context/Root";
import Layout from "./components/Layout/Layout";
import Account from "./components/Account/Account";

const App = () => {
  return (
    <RootProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/account" component={Account} />
          </Switch>
        </Layout>
      </Router>
    </RootProvider>
  );
};

export default App;
