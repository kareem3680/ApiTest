// Import required libraries
const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

// Import files
const dbConnection = require("./config/dataBase");
const globalError = require("./middleWares/errorMiddleware");
const ApiError = require("./utils/apiError");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

// usage
const app = express();
app.use(express.json({ limit: "50 kb" }));
dotenv.config({ path: "config.env" });

// Connect to MongoDB Database
dbConnection();

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Apply Rate Limit
app.use("/", limiter);

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
