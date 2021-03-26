import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";
import "./layout.scss";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import RootProvider from "./context/Root";
import Layout from "./components/Layout/Layout";

const App = () => {
  

  return (
    <RootProvider>
      <Layout>
        <Router>
          <div className="content">
            <Switch>
              <Route path="/signup" component={SignUp} />
            </Switch>
            <Switch>
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </Layout>
    </RootProvider>
  );
};

export default App;
