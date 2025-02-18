const express = require("express");
const userController = require("../controller/userController");
const userValidator = require("../validators/userValidator");

const router = express.Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(userValidator.createUserValidator, userController.createUser);

router
  .route("/:id")
  .get(userValidator.getUserValidator, userController.getSpecificUser)
  .put(userValidator.updateUserValidator, userController.updateUser)
  .delete(userValidator.deleteUserValidator, userController.deleteUser);

module.exports = router;
