const router = require("express").Router();

const driverAuthController = require("../controller/DriverAuthenticationController.js");

router.post("/signUp", driverAuthController.signUp);
router.post("/login", driverAuthController.logIn);

module.exports = router;
