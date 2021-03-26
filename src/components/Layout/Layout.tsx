import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentUser, getUserSession } from "../../utils/auth";

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
        backgroundImage: `url(${process.env.REACT_APP_CDN_URL}/images/dock.jpeg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="header">
        <h2>Header</h2>
      </div>

      {props.children}

      <div className="footer">
        <h2>Footer</h2>
      </div>
    </div>
  );
};

export default Layout;
