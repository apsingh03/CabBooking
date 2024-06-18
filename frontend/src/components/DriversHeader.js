import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DriverHeader = () => {
  const authReduxisAuthenticated = useSelector(
    (state) => state.driverAuth.loggedData
  );

  // console.log(authReduxisAuthenticated.email);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-5">
        <Link to="/" className="navbar-brand text-light" href="#">
          Drivers Panel
        </Link>
        <button
          style={{ color: "#fff" }}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon text-light"
            style={{ color: "#fff" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/driverDashboard"
                className="nav-link text-light"
                href="#"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/driverAuth" className="nav-link text-light" href="#">
                Driver Authentication
              </Link>
            </li>

            {authReduxisAuthenticated.isUserLogged === true ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light">
                    {" "}
                    {authReduxisAuthenticated.email &&
                      authReduxisAuthenticated.email}{" "}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light">
                    {" Lat - "}
                    {authReduxisAuthenticated.latitude &&
                      authReduxisAuthenticated.latitude}{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light">
                    {" Lon - "}
                    {authReduxisAuthenticated.longitude &&
                      authReduxisAuthenticated.longitude}{" "}
                  </Link>
                </li>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    localStorage.removeItem("loggedDriverToken");
                    window.location.replace("/");
                  }}
                >
                  {" "}
                  Log out Driver{" "}
                </button>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default DriverHeader;
