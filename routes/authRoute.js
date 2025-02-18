const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();
const authValidator = require("../validators/authValidator");

router.post("/logIn", authValidator.logInValidator, authController.logIn);

module.exports = router;
