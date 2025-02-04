const { users } = require("../db/dbmodel");
const bcrypt = require("bcrypt");

async function updateUserProfile(req, res) {
  try {
    const user = req.user;
    const dataBody = req.body;
    if (dataBody.password) {
      const newPassword = await bcrypt.hash(body.password, 10);
      dataBody.password = newPassword;
    }
    console.log(dataBody, user);

    const update = await users.update(dataBody, {
      where: { id: user.id },
    });
    success = "user updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getUserProfile(req, res) {
  const userProfile = await users.findByPk(req.user.id);
  return res.status(200).json({ userProfile });
}

module.exports = { updateUserProfile, getUserProfile };
