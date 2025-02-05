const { userHash, tokenSign, checkCredentials } = require("../utilities/token");
const { categories, products } = require("../db/dbmodel");
const { Op } = require("sequelize");

async function home(req, res) {
  return res.status(200).json(`welcome to Ecommerce project`);
}

async function signup(req, res) {
  try {
    const formFill = await checkCredentials(req.body);
    const result = await userHash(req.body);
    result
      ? res.status(200).json(`signup successfull`)
      : res.status(400).json(`this email is already used`);
  } catch (error) {
    return res.status(403).json(error.errors || error);
  }
}

async function login(req, res) {
  try {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      const result = await tokenSign(email, password);
      if (result) {
        return res
          .status(200)
          .json({ message: `login successfull`, key: result });
      } else {
        return res.status(401).json(`invalid password`);
      }
    } else {
      return res.status(400).json(`enter both email and password`);
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

async function getProducts(req, res) {
  try {
    const filter = {
      ...(req.query.priceGt
        ? { price: { [Op.gt]: Number(req.query.priceGt) } }
        : {}),
      ...(req.query.priceLt
        ? { price: { [Op.lt]: Number(req.query.priceLt) } }
        : {}),
      ...(req.query.stockGt
        ? { stock: { [Op.gt]: Number(req.query.stockGt) } }
        : {}),
      ...(req.query.stockLt
        ? { stock: { [Op.lt]: Number(req.query.stockLt) } }
        : {}),
      ...(req.query.cId ? { category_id: req.query.cId } : {}),
    };

    const filteredProducts = await products.findAll({ where: filter });
    if (filteredProducts.length == 0) {
      return res.status(200).json(`no product matches your filter`);
    }
    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getProductById(req, res) {
  try {
    const inputId = req.params.id;
    const product = await products.findByPk(inputId);
    if (product == null) {
      return res.status(401).json(`no such product available`);
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  home,
  signup,
  login,
  getCategories,
  getProducts,
  getProductById,
};
