const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:id")
  .get(userController.getSpecificUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
