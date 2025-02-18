const ApiError = require("../utils/apiError");

const sendError = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJwtSignatureError = () =>
  new ApiError("Invalid Token, please try again", 401);

const handleJwtExpiredError = () =>
  new ApiError("Your Token expired, please log in again", 401);

const globalError = (err, req, res, next) => {
  if (err.name == "JsonWebTokenError") err = handleJwtSignatureError();
  if (err.name == "TokenExpiredError") err = handleJwtExpiredError();
  sendError(err, res);
};

module.exports = globalError;
