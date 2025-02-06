const { idValidator } = require("../utilities/validator");
const { cart, wishlist, orders, products } = require("../db/dbmodel");
const { Sequelize } = require("sequelize");

// function to add products to the customer`s cart in carts table
async function addToCart(req, res) {
  try {
    //role validation
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }

    //id availability check
    if (!req.body.product_id) {
      return res.status(401).json({ message: `product_id required` });
    }

    //check for duplicate
    const duplicate = await cart.findOne({
      where: { user_id: req.user.id, product_id: req.body.product_id },
    });
    //if duplicate
    if (duplicate) {
      const userCart = {
        quantity: req.body.quantity
          ? duplicate.quantity + req.body.quantity
          : duplicate.quantity + 1,
      };
      const productAdd = await cart.update(userCart, {
        where: { user_id: req.user.id },
      });
      //if not duplicate
    } else {
      const userCart = {
        user_id: req.user.id,
        product_id: req.body.product_id,
        ...(req.body.quantity
          ? { quantity: req.body.quantity }
          : { quantity: 1 }),
      };
      const validProduct = await products.findOne({
        where: { id: userCart.product_id },
      });
      const productAdd = await cart.create(userCart);
    }
    return res
      .status(200)
      .json({ message: `product successfully added to the cart` });
  } catch (error) {
    return res.status(401).json({ message: `no such product exist` });
  }
}

// function to add product to user`s wishlist
async function addToWishList(req, res) {
  try {
    //role validation
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }

    // id availability check
    if (!req.body.productId) {
      return res.status(401).json({ message: `productId required` });
    }
    const userWishList = {
      user_id: req.user.id,
      product_id: req.body.productId,
    };
    const productAdd = await wishlist.create(userWishList);
    return res
      .status(200)
      .json({ message: `product successfully added to wishlist` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get all the cart items from cart table
async function getCartItems(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    const userCart = await cart.findAll({ where: { user_id: req.user.id } });
    return res.status(200).json({ userCart });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get all wishlist items from wishlist table
async function getWishList(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    const userWishList = await wishlist.findAll({
      where: { user_id: req.user.id },
    });
    return res.status(200).json({ userWishList });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to remove item from the cart
async function removeFromCart(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    idValidator(req.params.id);
    const targetId = req.params.id;
    const deleteItemFromCart = await cart.destroy({
      where: { product_id: targetId },
    });
    return res.status(200).json({ message: `item deleted from the cart` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to remove item from wishlist
async function removeFromWishList(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    idValidator(req.params.id);
    const targetId = req.params.id;
    const deleteItemFromWishList = await wishlist.destroy({
      where: { product_id: targetId },
    });
    return res.status(200).json({ message: `item deleted from wishlist` });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get order history of customer
// (working but not tested)
async function getOrderHistory(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    const orderHistory = await orders.findAll({
      where: { user_id: req.user.id },
    });
    console.log(orderHistory);
    return res.status(200).json({ orderHistory });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to get order details of customer
// (working but not tested)
async function getOrderDetails(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    idValidator(req.params.id);
    const orderDetails = await orders.findByPk(req.params.id);
    console.log(orderDetails);
    return res.status(200).json({ orderDetails });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// function to place new order
// (not working)
async function placeOrder(req, res) {
  try {
    if (req.user.role != "customer") {
      return res.status(402).json({ message: `invalid role` });
    }
    const userCart = await cart.findOne({
      where: { user_id: req.user.id },
    });
    if (!userCart) {
      return res.status(400).json({ message: `your cart is empty` });
    }
    // for total price: sum( quantity(cart) * price(products) )
    const totalCartPrice = await cart.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: products,
          attributes: [],
        },
      ],
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.col("quantity") * Sequelize.col("products.price")
          ),
          "total_price",
        ],
        "product_id",
      ],
      group: ["cart.product_id"],
    });

    // const cartItems = await cart.findAll({ where: { user_id: req.user.id } });

    return res.status(200).json({ message: totalCartPrice });
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
  getOrderHistory,
  getOrderDetails,
  placeOrder,
};
