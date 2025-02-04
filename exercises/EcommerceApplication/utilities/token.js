const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { users } = require("../db/dbmodel");

async function userHash(body) {
  const newPassword = await bcrypt.hash(body.password, 10);
  const isExist = await users.findAll({ where: { email: body.email } });
  if (isExist == []) {
    return users
      .update({ password: newPassword }, { where: { email: body.email } })
      .then()
      .catch((err) => console.log(err));
  } else {
    body.password = newPassword;
    return users
      .create(body)
      .then()
      .catch((err) => console.log(err));
  }
}

async function tokenSign(id, role, inputPassword) {
  const user = await users.findByPk(id);
  const hash = user.dataValues.password;
  const isValid = await bcrypt.compare(inputPassword, hash);
  if (isValid) {
    const mytoken = jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return mytoken;
  }
  return;
}

module.exports = { userHash, tokenSign };
