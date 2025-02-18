const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    unique: [true, "name must be unique"],
    minlength: [3, "Too short name"],
    maxlength: [30, "Too long name"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
    lowercase: true,
  },
  age: { type: Number, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
