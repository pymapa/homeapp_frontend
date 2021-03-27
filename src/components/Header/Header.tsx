import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { isValidSession } from "../../utils/auth";
import "./Header.scss";
import UserDropdown from "./UserDropdown";

interface Props {}

const Header = (props: Props) => {
  const { userSession } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = !!(userSession && isValidSession(userSession));
    setIsLoggedIn(loggedIn);
  }, [userSession]);

  return (
    <div className="layout__header header">
      <div className="header__link">
        <Link to="/">Home</Link>
      </div>
      {isLoggedIn ? (
        <UserDropdown />
      ) : (
        <Link to="/login" className="header__loginbutton">
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
