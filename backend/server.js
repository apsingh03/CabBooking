require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const userAuthRoute = require("./routes/UserAuthenticationRoutes");

const driverAuthRoute = require("./routes/DriverAuthenticationRoutes");

app.use("/userAuth", userAuthRoute);
app.use("/driverAuth", driverAuthRoute);

app.use("/", function (req, res) {
  try {
    return res.status(200).send("Welcome to Cab Booking Backend ");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
