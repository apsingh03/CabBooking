import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Outlet } from "react-router-dom";

const DriversPrivateRoute = ({ element }) => {
  const driverIsAuthenticated = useSelector(
    (state) => state.driverAuth.loggedData.isUserLogged
  );

  return driverIsAuthenticated ? element : <Navigate to="/driverAuth" />;
};

export default DriversPrivateRoute;
