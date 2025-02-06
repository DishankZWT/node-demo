const { users } = require("../db/dbmodel");
const bcrypt = require("bcrypt");

// both customer and admin can update their profile
async function updateUserProfile(req, res) {
  try {
    const user = req.user;
    const dataBody = req.body;
    if (dataBody.password) {
      const newPassword = await bcrypt.hash(body.password, 10);
      dataBody.password = newPassword;
    }
    const update = await users.update(dataBody, {
      where: { id: user.id },
    });
    success = "user updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//both customer and admin can get their profile
async function getUserProfile(req, res) {
  try {
    const userProfile = await users.findByPk(req.user.id);
    const userInterface = {
      ...userProfile,
    };
    delete userInterface.dataValues.password;
    delete userInterface.dataValues.createdAt;
    delete userInterface.dataValues.updatedAt;
    return res.status(200).json(userInterface.dataValues);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = { updateUserProfile, getUserProfile };
