const { cart, wishlist } = require("../db/dbmodel");

async function addToCart(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    if (!req.body.productId) {
      return res.status(401).json(`productId required`);
    }
    const userCart = {
      user_id: req.user.id,
      product_id: req.body.productId,
      ...(req.body.quantity
        ? { quantity: req.body.quantity }
        : { quantity: 1 }),
    };
    const productAdd = await cart.create(userCart);
    return res.status(200).json(`product successfully added to the cart`);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function addToWishList(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    if (!req.body.productId) {
      return res.status(401).json(`productId required`);
    }
    const userWishList = {
      user_id: req.user.id,
      product_id: req.body.productId,
    };
    const productAdd = await wishlist.create(userWishList);
    return res.status(200).json(`product successfully added to wishlist`);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getCartItems(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    const userCart = await cart.findAll({ where: { user_id: req.user.id } });
    return res.status(200).json({ userCart });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getWishList(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    const userWishList = await wishlist.findAll({
      where: { user_id: req.user.id },
    });
    return res.status(200).json({ userWishList });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function removeFromCart(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    const targetId = req.params.id;
    const deleteItemFromCart = await cart.destroy({
      where: { product_id: targetId },
    });
    return res.status(200).json(`item deleted from the cart`);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function removeFromWishList(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json(`invalid role`);
    }
    const targetId = req.params.id;
    const deleteItemFromWishList = await wishlist.destroy({
      where: { product_id: targetId },
    });
    return res.status(200).json(`item deleted from wishlist`);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  addToCart,
  addToWishList,
  getCartItems,
  getWishList,
  removeFromCart,
  removeFromWishList,
};
