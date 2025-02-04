const { userHash, tokenSign } = require("../utilities/token");
const { categories } = require("../db/dbmodel");

async function home(req, res) {
  return res.status(200).json(`welcome to Ecommerce project`);
}

async function signup(req, res) {
  try {
    const result = await userHash(req.body);
    return res.status(200).json(`signup successfull`);
  } catch (error) {
    return res.status(403).json({ error });
  }
}

async function login(req, res) {
  try {
    const { id, role, password } = req.body;
    const result = await tokenSign(id, role, password);
    if (result) {
      const obj = {};
      obj.key = result;
      return res.status(200).json({ message: obj });
    } else {
      return res.status(401).json(`invalid password`);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getCategories(req, res) {
  try {
    const allCategories = await categories.findAll();
    return res.status(200).json({ allCategories });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = { home, signup, login, getCategories };
