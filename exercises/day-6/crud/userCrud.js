const { users, user_images, user_profiles } = require("../model/sqmodel");
const { Op } = require("sequelize");

function getOneUser(filters) {
  if (filters.ageGt) {
    filters.age = { [Op.gt]: filters.ageGt };
    delete filters.ageGt;
    console.log(filters);
  }
  return users
    .findAll({ where: filters })
    .then()
    .catch((err) => console.log(err));
}

function getUser(inputId) {
  return users
    .findByPk(inputId)
    .then()
    .catch((err) => console.log(err));
}

function getUserInfo(inputId) {
  return users
    .findAll({
      where: { id: inputId },
      include: [{ model: user_profiles }, { model: user_images }],
    })
    .then()
    .catch((err) => console.log(err));
}

function insertUser(value) {
  return users
    .create(value)
    .then()
    .catch((err) => console.log(err));
}

function updateUser(value, inputId) {
  return users
    .update(value, { where: { id: inputId } })
    .then()
    .catch((err) => console.log(err));
}

function deleteUser(inputId) {
  return users
    .destroy({ where: { id: inputId } })
    .then()
    .catch((err) => console.log(err));
}

module.exports = {
  getOneUser,
  getUser,
  getUserInfo,
  insertUser,
  updateUser,
  deleteUser,
};
