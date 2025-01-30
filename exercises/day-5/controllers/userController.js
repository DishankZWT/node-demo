const { pool } = require("../db/db");
const moment = require("moment");

async function home(req, res) {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API!" });
}

//get list of all users from users table
async function getUsers(req, res) {
  try {
    const [getUsers] = await pool.query(`SELECT * FROM users`);
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//get user info from users, user_images and user_profiles table
async function getUserInfo(req, res) {
  try {
    const id = req.params.id;
    const [getUserById] = await pool.query(
      `SELECT Users.id, Users.name, Users.email, User_profiles.bio, User_images.imageName, 
      User_images.path FROM users Users
      LEFT JOIN user_profiles User_profiles ON Users.id = User_profiles.userId
      LEFT JOIN user_images User_images ON Users.id = User_images.userId
      WHERE Users.id = ?
      GROUP BY Users.id, Users.name, Users.email, User_profiles.bio, User_images.imageName, User_images.path`,
      [id]
    );
    if (getUserById.length == 0) {
      return res.status(404).json({ message: "no such user exist" });
    }
    return res.status(200).json(getUserById);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//get user profile by id from user_profiles table
async function getUserProfileById(req, res) {
  try {
    const id = req.params.id;
    const [getUsers] = await pool.query(
      `SELECT * FROM user_profiles WHERE id = ?`,
      [id]
    );
    if (getUsers.length == 0) {
      return res
        .status(404)
        .json({ message: "no profile exist for this user" });
    }
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//create new user into users table
async function createUser(req, res) {
  try {
    const dataBody = req.body;
    const result = Object.values(dataBody);
    const [createUser] = await pool.query(
      `INSERT INTO users (name, email, age, role, isActive) VALUES( ?, ?, ?, ?, ?)`,
      result
    );
    const temp = createUser.insertId;
    const [newUser] = await pool.query(`SELECT * FROM users where id = ?`, [
      temp,
    ]);

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//create user profile in user_profiles table
async function createUserProfile(req, res) {
  try {
    const dataBody = req.body;
    const result = Object.values(dataBody);
    console.log(result);

    const [createUser] = await pool.query(
      `INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl) VALUES( ?, ?, ?, ?, ?)`,
      result
    );
    console.log(createUser);

    const temp = createUser.insertId;
    const [newProfile] = await pool.query(
      `SELECT * FROM user_profiles where id = ?`,
      [temp]
    );
    console.log(newProfile);

    if (newProfile.length == 0) {
      return res.status(404).json({ message: "no such user exist" });
    }
    return res.status(200).json(newProfile);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//update user in users table
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const [updateUser] = await pool.query(`UPDATE users SET ? WHERE id =?`, [
      dataBody,
      id,
    ]);
    success = "user updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete user from uses able (user_images and user_profile remove on cascade)
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const [deleteUser] = await pool.query(`DELETE FROM users WHERE id = ?`, [
      id,
    ]);
    success = "user deleted successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete user profile from user_profiles table
async function deleteUserProfile(req, res) {
  try {
    const id = req.params.id;
    const [deleteUser] = await pool.query(
      `DELETE FROM user_profiles WHERE id = ?`,
      [id]
    );
    success = "user profile deleted successfully";
    if (deleteUser.affectedRows == 0) {
      return res.status(404).json({ message: "no such user exist" });
    }
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete all user images from user_images table
async function deleteUserImages(req, res) {
  try {
    const userId = req.params.userId;

    const [deleteUser] = await pool.query(
      `DELETE FROM user_images WHERE userId = ?`,
      [userId]
    );
    success = "user images deleted successfully";

    if (deleteUser.affectedRows == 0) {
      return res.status(404).json({ message: "no such user exist" });
    }
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//update user profile in user_profiles table
async function updateUserProfile(req, res) {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const [updateUser] = await pool.query(
      `UPDATE user_profiles SET ? WHERE id =?`,
      [dataBody, id]
    );
    success = "user profile updated successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  home,
  getUsers,
  getUserInfo,
  getUserProfileById,
  createUser,
  createUserProfile,
  updateUser,
  deleteUser,
  deleteUserProfile,
  deleteUserImages,
  updateUserProfile,
};
