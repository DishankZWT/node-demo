const { users, categories, products } = require("../db/dbmodel");
const fs = require("fs");
const { idValidator } = require("../utilities/validator");
const { productCredentials } = require("../utilities/validator");
const bcrypt = require("bcrypt");

// function to get list of all users from users table
async function getAllUsers(req, res) {
  try {
    if (req.user.role != "admin") {
      return res.status(402).json({ message: `invalid role` });
    }
    const getList = await users.findAll();
    return res.status(200).json({ getList });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to create new category by admin
async function createCategory(req, res) {
  try {
    if (req.user.role != "admin") {
      return res.status(402).json({ message: `invalid role` });
    }
    if (!req.body.name) {
      return res.status(400).json({ message: `category name is required` });
    }
    console.log(req.body.name);

    const newCategory = await categories.create({ name: req.body.name });
    return res
      .status(200)
      .json({ message: `category ${req.body.name} is created` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to add new product into the products table by admin
async function addNewProduct(req, res) {
  try {
    if (req.user.role != "admin") {
      fs.rm(`./${req.file.path}`, () => {});
      return res.status(402).json({ message: `invalid role` });
    }
    const validFormat = await productCredentials(req.body);

    const productTemplate = {
      stock: 0,
      ...req.body,
      image_url: req.file.path,
    };
    const duplicate = await products.findOne({
      where: { name: productTemplate.name },
    });
    if (!duplicate) {
      const newProduct = await products.create(productTemplate);
      return res
        .status(200)
        .json({ message: `product ${req.body.name} is added` });
    } else {
      fs.rm(`./${req.file.path}`, () => {});
      return res.status(400).json({ message: `product with same name exist` });
    }
  } catch (error) {
    fs.rm(`./${req.file.path}`, () => {});
    return res.status(400).json(error.errors);
  }
}

// function to update product details into products table by admin
async function updateProduct(req, res) {
  try {
    if (req.user.role != "admin") {
      return res.status(402).json({ message: `invalid role` });
    }
    idValidator(req.params.id);
    const previousImage = await products.findByPk(req.params.id);
    if (previousImage.dataValues.image_url != null) {
      fs.rm(`./${previousImage.dataValues.image_url}`, () => {});
    }
    const obj = req.body;
    obj.image_url = req.file ? req.file.path : null;
    const updatedProduct = await products.update(obj, {
      where: { id: req.params.id },
    });

    return res.status(200).json({ message: `product is updated successfully` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to delete product from products table by admin
async function deleteProduct(req, res) {
  try {
    if (req.user.role != "admin") {
      return res.status(402).json({ message: `invalid role` });
    }
    const targetId = rq.params.id;
    const previousImage = await products.findByPk(targetId);
    fs.rm(`./${previousImage.dataValues.image_url}`, () => {});
    const deletedProduct = await products.destroy({ where: { id: targetId } });
    return res.status(200).json({ message: `product deleted successfully` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  getAllUsers,
  createCategory,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
