const JWT = require("jsonwebtoken");
const createToken = require("../utils/createToken");
const userModel = require("../models/userModel");
const ApiError = require("../utils/apiError");

exports.logIn = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[2];
  }
  if (!token) {
    return next(
      new ApiError("You are not login , please login and try again.", 401)
    );
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  const currentUser = await userModel.findOne({
    _id: decoded.userId,
  });
  if (!currentUser) {
    return next(new ApiError("User not found", 401));
  }
  req.user = currentUser;
  next();
};

exports.allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("You are not allowed to use this route", 403));
    }
    next();
  };
