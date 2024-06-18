import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import PrivateRoute from "./components/PrivateRoute";
import UserSignUp from "./pages/UserSignUp";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/auth" element={<UserSignUp />} />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </>
  );
}

export default App;
