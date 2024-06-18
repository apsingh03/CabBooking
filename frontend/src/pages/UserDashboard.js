import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";

const UserDashboard = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking cab from ${location.latitude} to`);
  };

  return (
    <>
      <UserHeader />
      <div className="col-12  userDashboard ">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="userDashboard_card">
              <h5 className="text-center">Book A Cab</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentLocation" className="form-label">
                    Current Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentLocation"
                    value={`Latitude ${location.latitude} Longitude ${location.longitude} `}
                    onClick={() => fetchLocation()}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="destination" className="form-label">
                    Destination
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                  Book Now
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="userDashboard_card">
              <h5 className="text-center">All Bookings </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
