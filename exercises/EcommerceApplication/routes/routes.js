const express = require("express");
const { upload } = require("../utilities/multer");
const path = require("path");

//Router
const router = express.Router();

//controllers
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

//middlewares
const authenticate = require("../middleware/tokenCheck");

//validators

// public routes
router.get("/", publicController.home);
router.get("/api/categories", publicController.getCategories);
// router.get("/api/products", publicController.getProducts);             (pending)(apply filter)
// router.get("/api/products/:id", publicController.getProductById);      (pending)(apply filter)
router.post("/api/auth/register", publicController.signup);
router.post("/api/auth/login", publicController.login);

// customer routes
// router.get("/api/cart", customerController.getCartItems);
// router.get("/api/wishlist", customerController.getWishlist);
// router.get("/api/orders", customerController.getOrderHistory);
// router.get("/api/orders/:id", customerController.getOrderDetails);
// router.post("/api/cart", customerController.addToCart);
// router.post("/api/wishlist", customerController.addToWishlist);
// router.post("/api/orders", customerController.placeOrder);
// router.delete("/api/cart/:id", customerController.removeFromCart);
// router.delete("/api/wishlist/:id", customerController.removeFromWishlist);

// customer & admin routes
router.get("/api/users/profile", authenticate, userController.getUserProfile);
router.put(
  "/api/users/profile",
  authenticate,
  userController.updateUserProfile
);

// admin routes
router.get("/api/users", authenticate, adminController.getAllUsers);
router.post("/api/categories", authenticate, adminController.createCategory);
router.post(
  "/api/products",
  authenticate,
  upload.single("image"),
  adminController.addNewProduct
);
router.put(
  "/api/products/:id",
  authenticate,
  upload.single("image"),
  adminController.updateProduct
);
// router.put("/api/orders/:id/status", adminController.updateOrderStatus);
router.delete("/api/products/:id", authenticate, adminController.deleteProduct);

module.exports = router;
