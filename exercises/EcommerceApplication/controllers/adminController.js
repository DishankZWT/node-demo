const { users, categories, products } = require("../db/dbmodel");
const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  if (req.user.role != "admin") {
    return res.status(402).json(`invalid role`);
  }
  const getList = await users.findAll();
  return res.status(200).json({ getList });
}

async function createCategory(req, res) {
  if (req.user.role != "admin") {
    return res.status(402).json(`invalid role`);
  }
  const dataBody = req.body;
  const newCategory = await categories.create(dataBody);
  return res.status(200).json(`category ${req.body.name} is created`);
}

async function addNewProduct(req, res) {
  if (req.user.role != "admin") {
    return res.status(402).json(`invalid role`);
  }
  const newProduct = await products.create({
    name: req.body.name,
    description: req.body?.description,
    price: req.body.price,
    stock: req.body?.stock || 0,
    category_id: req.body.category_id,
    image_url: req.file.path || null,
  });
  return res.status(200).json(`product ${req.body.name} is added`);
}

async function updateProduct(req, res) {
  if (req.user.role != "admin") {
    return res.status(402).json(`invalid role`);
  }
  const obj = req.body;
  obj.image_url = req.file.path;
  const updatedProduct = await products.update(obj, {
    where: { id: req.params.id },
  });
  return res.status(200).json(`product is updated successfully`);
}

async function deleteProduct(req, res) {
  if (req.user.role != "admin") {
    return res.status(402).json(`invalid role`);
  }
  const targetId = rq.params.id;
  const deletedProduct = await products.destroy({ where: { id: targetId } });
  return res.status(200).json(`product deleted successfully`);
}

module.exports = {
  getAllUsers,
  createCategory,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
