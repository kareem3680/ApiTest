// Import required libraries
const express = require("express");

// Import files
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");

// usage
const app = express();
app.use(express.json());
dotenv.config({ path: "config.env" });

// Routes
app.use("/users", userRoute);

// Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
