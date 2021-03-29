import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentUser, getUserSession } from "../../utils/auth";
import Header from "../Header/Header";
import "./layout.scss";


interface Props {
  children: JSX.Element;
}

const Layout = (props: Props) => {
  const { user, setUser, setUserSession } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (!user) {
        const currentUser = getCurrentUser();
        console.log(currentUser)
        if (currentUser) {
          const userSession = await getUserSession(currentUser);
          setUser(currentUser);
          setUserSession(userSession);
        } else {
          history.push("/login");
        }
      }
    })();
  }, [user, history, setUser, setUserSession]);

  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_CDN_URL}/images/shore.jpeg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      {props.children}

      <div className="layout__footer">
        <h2>Footer</h2>
      </div>
    </div>
  );
};

export default Layout;
