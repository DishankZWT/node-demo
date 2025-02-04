const { users, user_images, user_profiles } = require("../model/sqmodel");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { dotenv } = require("dotenv").config();
const jwt = require("jsonwebtoken");

async function getOneUser(query) {
  const filter = {};

  if (query?.role) {
    filter.role = query?.role;
  }
  if (query?.isActive) {
    filter.isActive = query?.isActive;
  }
  if (query?.ageGt) {
    filter.age = { [Op.gt]: Number(query?.ageGt) };
  }

  const limit = Number(query?.limit) || 5;
  const offset = (query?.page - 1) * limit || 0;

  const col = query?.col || "id";
  const order = query?.order || `ASC`;

  return users
    .findAll({
      where: filter,
      limit: limit,
      offset: offset,
      order: [[col, order]],
    })
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

async function userHash(inputId, inputPassword) {
  const newPassword = await bcrypt.hash(inputPassword, 10);
  console.log(newPassword);
  return users
    .update({ password: newPassword }, { where: { id: inputId } })
    .then()
    .catch((err) => console.log(err));
}

async function userVarify(inputId, inputPassword) {
  const user = await users.findByPk(inputId);
  const hash = user.dataValues.password;
  const isValid = bcrypt.compare(inputPassword, hash);
  if (isValid) {
    const mytoken = jwt.sign({ inputId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(mytoken);
    return mytoken;
  }
  return;
}

module.exports = {
  getOneUser,
  getUser,
  getUserInfo,
  insertUser,
  updateUser,
  deleteUser,
  userHash,
  userVarify,
};
