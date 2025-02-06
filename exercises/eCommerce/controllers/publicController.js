const { idValidator } = require("../utilities/validator");
const { categories, products } = require("../db/dbmodel");
const { Op } = require("sequelize");

async function home(req, res) {
  return res.status(200).json({ message: `welcome to Ecommerce project` });
}

// function to get list of all categories from categories table
async function getCategories(req, res) {
  try {
    const allCategories = await categories.findAll();
    return res.status(200).json({ allCategories });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get list of all products from products table
async function getProducts(req, res) {
  try {
    const filter = {
      ...(req.query.priceGt && {
        price: { [Op.gt]: Number(req.query.priceGt) },
      }),
      ...(req.query.priceLt && {
        price: { [Op.lt]: Number(req.query.priceLt) },
      }),
      ...(req.query.stockGt && {
        stock: { [Op.gt]: Number(req.query.stockGt) },
      }),
      ...(req.query.stockLt && {
        stock: { [Op.lt]: Number(req.query.stockLt) },
      }),
      ...(req.query.cId && { category_id: req.query.cId }),
    };

    const filteredProducts = await products.findAll({ where: filter });
    if (filteredProducts.length == 0) {
      return res
        .status(200)
        .json({ message: `no product matches your filter` });
    }
    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get product by id from products table
async function getProductById(req, res) {
  try {
    const inputId = req.params.id;
    idValidator(inputId);
    const product = await products.findByPk(inputId);
    if (product == null) {
      return res.status(401).json({ message: `no such product available` });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  home,
  getCategories,
  getProducts,
  getProductById,
};
