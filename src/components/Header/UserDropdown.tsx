import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "../../utils/auth";

interface Props {}

const UserDropdown = (props: Props) => {
  const {} = props;
  const {user, setUser, setUserSession} = useContext(AuthContext)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [closeTimerId, setCloseTimerId] = useState<ReturnType<typeof setTimeout>>();

  const hideDropdown = () => {
    setUserDropdownOpen(false)
  };

  const openDropdown = () => {
    console.log('openDropdown', closeTimerId)
    closeTimerId && clearTimeout(closeTimerId)
    setUserDropdownOpen(true);
  };

  const closeWithTimer = () => {
    console.log("closeWithTimer", closeTimerId)
    closeTimerId && clearTimeout(closeTimerId)
    const timerId = setTimeout(() => {
      hideDropdown()
    }, 500)
    setCloseTimerId(prevState => timerId)
  };

  const history = useHistory()
  const handleSignout = () => {
    user && signOut(user)
    setUser(null)
    setUserSession(null)
    history.replace("/")
  }

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
            <button onClick={handleSignout} className="header__dropdown--item">Sign out</button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default UserDropdown;
