const { users } = require("../model/sqmodel");

function getOneUser() {
  return users
    .findAll()
    .then(console.log("user fetched successfully"))
    .catch((err) => console.log(err));
}

function getUser(inputId) {
  return users
    .findByPk(inputId)
    .then(console.log("user fetched successfully"))
    .catch((err) => console.log(err));
}

function insertUser(value) {
  return users
    .create(value)
    .then(console.log("user created successfully"))
    .catch((err) => console.log(err));
}

function updateUser(value, inputId) {
  return users
    .update(value, { where: { id: inputId } })
    .then(console.log("user updated successfully"))
    .catch((err) => console.log(err));
}

function deleteUser(inputId) {
  return users
    .destroy({ where: { id: inputId } })
    .then(console.log("user deleted successfully"))
    .catch((err) => console.log(err));
}

module.exports = { getOneUser, getUser, insertUser, updateUser, deleteUser };
