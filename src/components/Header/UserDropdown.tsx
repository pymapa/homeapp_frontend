import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "../../utils/auth";

const UserDropdown = () => {
  const { user, setUser, setUserSession } = useContext(AuthContext);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [closeTimerId, setCloseTimerId] = useState<
    ReturnType<typeof setTimeout>
  >();

  const hideDropdown = () => {
    setUserDropdownOpen(false);
  };

  const openDropdown = () => {
    closeTimerId && clearTimeout(closeTimerId);
    setUserDropdownOpen(true);
  };

  const closeWithTimer = () => {
    closeTimerId && clearTimeout(closeTimerId);
    const timerId = setTimeout(() => {
      hideDropdown();
    }, 250);
    setCloseTimerId(() => timerId);
  };

  const history = useHistory();
  const handleSignout = () => {
    user && signOut(user);
    setUser(null);
    setUserSession(null);
    history.replace("/login");
  };

  return (
    <React.Fragment>
      <div
        className="header__dropdown header__dropdown--user"
        onMouseEnter={openDropdown}
      >
        <FontAwesomeIcon icon={faUser} />
        {userDropdownOpen && (
          <div
            className="header__dropdown--items"
            onMouseEnter={openDropdown}
            onMouseLeave={closeWithTimer}
          >
            <div className="header__dropdown--item">Account</div>
            <div className="header__dropdown--item">
              <button
                onClick={handleSignout}
                className="header__dropdown--button"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserDropdown;
