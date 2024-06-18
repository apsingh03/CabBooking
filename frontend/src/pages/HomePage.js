import React, { useEffect, useState } from "react";
import Header from "../components/UserHeader";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import DriverDashboard from "./DriverDashboard";

const HomePage = () => {
  const navigate = useNavigate();

  const userIsAuthenticated = useSelector((state) => state.userAuth.loggedData);

  const DriverIsAuthenticated = useSelector(
    (state) => state.driverAuth.loggedData
  );

  console.log("DriverIsAuthenticated - ", DriverIsAuthenticated);
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      <Header />
    </>
  );
};

export default HomePage;
