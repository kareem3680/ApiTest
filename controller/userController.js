// requires
const userModel = require("../models/userModel");

// CRUD operations
exports.createUser = async (req, res, next) => {
  if (req.body.role) {
    delete req.body.role;
  }
  const newUser = await userModel.create(req.body);
  res.status(201).json({ data: newUser });
};

exports.getUsers = async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json({ data: users });
};

exports.getSpecificUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).send("User not found.");
  res.status(200).json({ data: user });
};

exports.updateUser = async (req, res, next) => {
  if (req.body.role) {
    delete req.body.role;
  }
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return res.status(404).send("User not found.");
  res.status(200).json({ data: user });
};

exports.deleteUser = async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found.");
  res.status(202).json({ message: "User deleted successfully." });
};
