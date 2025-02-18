const { check } = require("express-validator");
const validatorMiddleWare = require("../middleWares/validatorMiddleware");
const userModel = require("../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id Format"),
  validatorMiddleWare,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .custom((value) =>
      userModel.findOne({ name: value }).then((user) => {
        if (user) {
          return Promise.reject({
            message: `name already exists`,
            statusCode: 404,
          });
        }
      })
    )
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("User name must be at most 32 characters"),
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("User email must valid")
    .custom((value) =>
      userModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject({
            message: `E-Mail already exists`,
            statusCode: 404,
          });
        }
      })
    ),
  check("age")
    .notEmpty()
    .withMessage("Age is required")
    .isNumeric()
    .withMessage("Age must be a number"),
  validatorMiddleWare,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id Format"),
  check("name")
    .optional()
    .custom((value) =>
      userModel.findOne({ name: value }).then((user) => {
        if (user) {
          return Promise.reject({
            message: `name already exists`,
            statusCode: 404,
          });
        }
      })
    )
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("User name must be at most 32 characters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("User email must valid")
    .custom((value) =>
      userModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject({
            message: `E-Mail already exists`,
            statusCode: 404,
          });
        }
      })
    ),
  check("age").optional().isNumeric().withMessage("Age must be a number"),
  validatorMiddleWare,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id Format"),
  validatorMiddleWare,
];
