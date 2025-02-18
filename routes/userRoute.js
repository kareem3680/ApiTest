const express = require("express");
const userController = require("../controller/userController");
const userValidator = require("../validators/userValidator");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(userValidator.createUserValidator, userController.createUser);

router
  .route("/:id")
  .get(userValidator.getUserValidator, userController.getSpecificUser)
  .put(
    authController.protect,
    userValidator.updateUserValidator,
    authController.allowedTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    userValidator.deleteUserValidator,
    userController.deleteUser
  );

module.exports = router;
