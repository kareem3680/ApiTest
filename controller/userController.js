// require Data
const users = require("../data/userData");

// CRUD operations
exports.createUser = async (req, res, next) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.getUsers = async (req, res, next) => {
  res.json(users);
};

exports.getSpecificUser = async (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  res.json(user);
};

exports.updateUser = async (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  Object.assign(user, req.body);
  res.json(user);
};

exports.deleteUser = async (req, res, next) => {
  const userIndex = users.findIndex((u) => u.id == req.params.id);
  users.splice(userIndex, 1);
  res.status(204).send();
};
