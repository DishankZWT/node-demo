const {
  getOneUser,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} = require("../crud/crud");

async function home(req, res) {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API!" });
}

//get list of all users
async function getSingleUser(req, res) {
  try {
    const getSingleUser = await getOneUser();
    return res.status(200).json(getSingleUser);
  } catch (error) {
    return res.status(400).json(error);
  }
}

//get users by id from sqmodel table
async function getUsers(req, res) {
  try {
    const id = req.params.id;
    const getUsers = await getUser(id);
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
}

//create new user into users table
async function createUsers(req, res) {
  try {
    const dataBody = req.body;
    const createUser = await insertUser(dataBody);
    return res.status(200).json({ createUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//update user in users table
async function updateUsers(req, res) {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const update = await updateUser(dataBody, id);
    success = "user updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete user from uses able (user_images and user_profile remove on cascade)
async function deleteUsers(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteUser(id);
    success = "user deleted successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  home,
  getSingleUser,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
