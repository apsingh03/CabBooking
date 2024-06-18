import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import UserSignUp from "./pages/UserSignUp";
import DriverSignUp from "./pages/DriverSignUp";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import DriversPrivateRoute from "./components/DriversPrivateRoutes";
import UserPrivateRoute from "./components/UserPrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/auth" element={<UserSignUp />} />
        <Route path="/driverAuth" element={<DriverSignUp />} />
        {/* <Route path="/driverDashboard" element={<DriverDashboard />} /> */}
        {/* <Route path="/" element={<UserDashboard />} /> */}

        <Route
          path="/driverDashboard"
          element={<DriversPrivateRoute element={<DriverDashboard />} />}
        />

        <Route
          path="/"
          element={<UserPrivateRoute element={<UserDashboard />} />}
        />
      </Routes>
    </>
  );
}

export default App;
