const {
  getOneUser,
  getUser,
  getUserInfo,
  insertUser,
  updateUser,
  deleteUser,
  userHash,
  userVarify,
} = require("../crud/userCrud");

//welcome page
async function home(req, res) {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API!" });
}

//get list of all users from users table
async function getSingleUser(req, res) {
  try {
    const getSingleUser = await getOneUser(req.query);
    return res.status(200).json(getSingleUser);
  } catch (error) {
    return res.status(400).json(error);
  }
}

//get users by id from users table
async function getUsers(req, res) {
  try {
    const id = req.params.id;
    const getUsers = await getUser(id);
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
}

//get user information from all tables(users, user_images, user_profiles)
async function getUsersInfo(req, res) {
  try {
    const id = req.params.id;
    const getInfo = await getUserInfo(id);
    return res.status(200).json(getInfo);
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

//delete user from uses table (user_images and user_profile remove on cascade)
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

async function userSignup(req, res) {
  try {
    const { id, password } = req.body;
    console.log(req.body);

    const result = await userHash(id, password);
    return res.status(200).json(`signup successfull`);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function userLogin(req, res) {
  try {
    const { id, password } = req.body;
    const result = await userVarify(id, password);
    if (result) {
      req.user = user;
      return res.status(200).json(`login successfull`);
    } else {
      return res.status(401).json(`invalid password`);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  home,
  getSingleUser,
  getUsers,
  getUsersInfo,
  createUsers,
  updateUsers,
  deleteUsers,
  userSignup,
  userLogin,
};
