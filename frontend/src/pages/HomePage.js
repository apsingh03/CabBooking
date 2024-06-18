import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import DriverDashboard from "../components/DriverDashboard";

const HomePage = () => {
  const navigate = useNavigate();

  const authReduxisAuthenticated = useSelector(
    (state) => state.auth.loggedData
  );
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      <Header />

      {authReduxisAuthenticated.isUserLogged === true &&
      authReduxisAuthenticated.userType === "User" ? (
        <UserDashboard />
      ) : (
        <DriverDashboard />
      )}
    </>
  );
};

export default HomePage;
