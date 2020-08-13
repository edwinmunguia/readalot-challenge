import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { authStorage } from "../utils/authstorage";

const Header = () => {
  const { loggedInUser, logOutUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogOut = () => {
    logOutUser();
    authStorage.delete();
    history.push("/");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Read A Lot
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            {loggedInUser.isLoggedIn ? (
              <>
                <div className="d-inline d-lg-flex align-items-center ml-lg-auto">
                  <li className="nav-item mr-lg-3">
                    <NavLink
                      className="nav-link publish"
                      activeClassName="active"
                      aria-current="page"
                      to="/posts/new"
                    >
                      New article
                    </NavLink>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle session"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                    >
                      {loggedInUser.user.username}
                    </a>
                    <ul class="dropdown-menu">
                    <li>
                        <NavLink class="dropdown-item" to={`/profile/${loggedInUser.user.username}`} exact>
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <button class="dropdown-item" onClick={handleLogOut}>
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </li>
                </div>
              </>
            ) : (
              <div className="d-inline d-lg-flex ml-lg-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="btn ml-lg-2 btn-success active"
                    aria-current="page"
                    to="/signup"
                  >
                    Create account
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
