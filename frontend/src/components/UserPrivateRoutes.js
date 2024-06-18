import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = ({ element }) => {
  const userIsAuthenticated = useSelector(
    (state) => state.userAuth.loggedData.isUserLogged
  );

  return userIsAuthenticated ? element : <Navigate to="/auth" />;
};

export default UserPrivateRoute;
