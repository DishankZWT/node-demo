const {
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} = require("../crud/userProfileCrud");

//get users profile by user id from user_profiles table
async function getUsers(req, res) {
  try {
    const userId = req.params.userId;
    const getUsers = await getUser(userId);
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
}

//create new user profile into user_profiles table
async function createUsers(req, res) {
  try {
    const dataBody = req.body;
    const createUser = await insertUser(dataBody);
    return res.status(200).json({ createUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//update user profile in user_profiles table
async function updateUsers(req, res) {
  try {
    const dataBody = req.body;
    const update = await updateUser(dataBody);
    success = "user profile updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete user profile from user_profiles table
async function deleteUsers(req, res) {
  try {
    const userId = req.params.userId;
    const deleted = await deleteUser(userId);
    success = "user profile deleted successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
