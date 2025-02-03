const { user_profiles } = require("../model/sqmodel");

function getUser(inputId) {
  return user_profiles
    .findAll({ where: { userId: inputId } })
    .then()
    .catch((err) => console.log(err));
}

function insertUser(value) {
  return user_profiles
    .create(value)
    .then()
    .catch((err) => console.log(err));
}

function updateUser(value) {
  return user_profiles
    .update(value)
    .then()
    .catch((err) => console.log(err));
}

function deleteUser(inputId) {
  return user_profiles
    .destroy({ where: { userId: inputId } })
    .then()
    .catch((err) => console.log(err));
}

module.exports = {
  getUser,
  insertUser,
  updateUser,
  deleteUser,
};
