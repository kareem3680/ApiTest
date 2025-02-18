// Import required libraries
const express = require("express");

// Import files
const dotenv = require("dotenv");
const dbConnection = require("./config/dataBase");
const globalError = require("./middleWares/errorMiddleware");
const ApiError = require("./utils/apiError");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

// usage
const app = express();
app.use(express.json());
dotenv.config({ path: "config.env" });
dbConnection();

// Routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`can not find this route : ${req.originalUrl}`, 400));
});

// Handle Errors In Express
app.use(globalError);

// Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Handle Rejections Out Side Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors : ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`shutting down ....`);
    process.exit(1);
  });
});
