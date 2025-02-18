// Import required libraries
const express = require("express");

// Import files
const dotenv = require("dotenv");
const dbConnection = require("./config/dataBase");
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

// Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
