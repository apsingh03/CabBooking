import React, { useEffect, useState } from "react";
import Header from "../components/UserHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  createDriverAsync,
  loginDriverAsync,
} from "../Redux/Slices/DriverAuthenticationSlice";

const DriverSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpIsLoading, setsignUpIsLoading] = useState(false);
  const [logInIsLoading, setlogInIsLoading] = useState(false);
  // User denied Geolocation
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const fetchLocation = () => {
    // console.log("geolocation - ", navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(" position ", position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  async function handleSignUp(event) {
    setsignUpIsLoading(true);
    event.preventDefault();
    // console.log("handleSignUp");

    const fullName = event.target.signUpfullName.value;
    const email = event.target.signUpEmail.value;
    const password = event.target.signUpPassword.value;
    const latitude = location.latitude;
    const longitude = location.longitude;

    const locationError = location.error;

    if (locationError === "User denied Geolocation") {
      toast.error("Please Allow Location");
      setsignUpIsLoading(false);
    } else {
      const actionResult = await dispatch(
        createDriverAsync({
          fullName,
          email,
          password,

          latitude,
          longitude,
        })
      );
      // console.log("payload - ", actionResult.payload);
      if (actionResult.payload.msg === "Email Already Exist") {
        toast.error(actionResult.payload.msg);
        document.querySelector("#signUpfullName").value = "";
        setsignUpIsLoading(false);
      }
      if (actionResult.payload.msg === "Sign Up Successful") {
        toast.success(actionResult.payload.msg);
        // console.log("41 - ", actionResult);
        document.querySelector("#signUpfullName").value = "";
        document.querySelector("#signupEmail").value = "";
        document.querySelector("#signupPassword").value = "";
        setsignUpIsLoading(false);
        // navigate("/");
      }
    }
    // console.log(email, userType);
  }

  async function handleLogin(event) {
    setlogInIsLoading(true);
    event.preventDefault();

    try {
      // console.log("Handle LogIn");
      const loginEmail = event.target.loginEmail.value;
      const loginPassword = event.target.loginPassword.value;

      // console.log(loginEmail, loginPassword);
      // console.log(event);

      const actionResult = await dispatch(
        loginDriverAsync({
          email: loginEmail,
          password: loginPassword,
        })
      );

      if (actionResult.payload.msg === "Password Wrong") {
        toast.error(actionResult.payload.msg);
        document.querySelector("#loginPassword").value = "";
        setlogInIsLoading(false);
      }

      if (actionResult.payload.msg === "User Doesn't Exist") {
        toast.error(actionResult.payload.msg);
        document.querySelector("#loginEmail").value = "";
        setlogInIsLoading(false);
      }

      if (actionResult.payload.msg === "Logged In Successfull") {
        toast.success(actionResult.payload.msg);

        // console.log("action Payload", actionResult.payload.token);
        localStorage.setItem("loggedDriverToken", actionResult.payload.token);
        // window.location.replace("/");
        document.querySelector("#loginPassword").value = "";
        document.querySelector("#loginEmail").value = "";
        setlogInIsLoading(false);
        window.location.replace("/driverDashboard");
      }
    } catch (error) {
      console.log("Error handleLogin ", error.message);
    }
  }

  return (
    <>
      <Header />

      <div className="authentication">
        <div className="col-12 row  ">
          <h4 className="text-center"> Driver Sign Up </h4>

          <div className="col-12 col-md-6">
            <div className="card">
              <form onSubmit={handleSignUp}>
                <div className="d-flex flex-row justify-content-center p-2 ">
                  <h4 className=" text-dark px-3 ">Sign Up </h4>
                  {signUpIsLoading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : null}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="signUpfullName">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="signUpfullName"
                    name="signUpfullName"
                    aria-describedby="emailHelp"
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="signupEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    id="signupEmail"
                    name="signUpEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="signupPassword"
                    name="signUpPassword"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-3 d-flex flex-row justify-content-between ">
                  <p>
                    {" "}
                    <b>Latitude -</b> {location.latitude}
                  </p>
                  <p>
                    {" "}
                    <b>Longitude - </b> {location.longitude}
                  </p>
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3 mt-md-0 ">
            <div className="card">
              <form onSubmit={handleLogin}>
                <div className="d-flex flex-row justify-content-center p-2 ">
                  <h4 className=" text-dark px-3 ">Driver Log In </h4>
                  {logInIsLoading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="loginEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    required
                    name="loginEmail"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    placeholder="Password"
                    name="loginPassword"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverSignUp;
