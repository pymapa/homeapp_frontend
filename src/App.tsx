import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import RootProvider from "./context/Root";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <RootProvider>
      <Router>
        <Layout>
          <div className="layout__content">
            <Switch>
              <Route path="/signup" component={SignUp} />
            </Switch>
            <Switch>
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Layout>
      </Router>
    </RootProvider>
  );
};

export default App;
