const { insertUser, deleteUser } = require("../crud/userImagesCrud");

//create new user image into user_images table
async function createUsers(req, res) {
  try {
    const dataBody = req.file;
    const inputData = req.body.userId;
    const createUser = await insertUser(dataBody, inputData);
    return res.status(200).json({ createUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//delete user from user_images table
async function deleteUsers(req, res) {
  try {
    const userId = rq.params.userId;
    const deleted = await deleteUser(userId);
    success = "user images deleted successfully";
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  createUsers,
  deleteUsers,
};
