const express = require("express");
const { upload } = require("../utilities/multer");

//Router
const router = express.Router();

//controllers
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const customerController = require("../controllers/customerController");

//middlewares
const authenticate = require("../middleware/tokenCheck");

// public routes
router.get("/", publicController.home);
router.get("/api/categories", publicController.getCategories);
router.get("/api/products", publicController.getProducts);
router.get("/api/products/:id", publicController.getProductById);
router.post("/api/auth/register", publicController.signup);
router.post("/api/auth/login", publicController.login);

// customer routes
router.get("/api/cart", authenticate, customerController.getCartItems);
router.get("/api/wishlist", authenticate, customerController.getWishList);
// router.get("/api/orders", customerController.getOrderHistory);   (optional)
// router.get("/api/orders/:id", customerController.getOrderDetails);   (optional)
router.post("/api/cart", authenticate, customerController.addToCart);
router.post("/api/wishlist", authenticate, customerController.addToWishList);
// router.post("/api/orders", customerController.placeOrder);   (optional)
router.delete("/api/cart/:id", authenticate, customerController.removeFromCart);
router.delete(
  "/api/wishlist/:id",
  authenticate,
  customerController.removeFromWishList
);

// customer & admin routes
router.get("/api/users/profile", authenticate, userController.getUserProfile);
router.put(
  "/api/users/profile",
  authenticate,
  userController.updateUserProfile // admin can change customer profile (later)
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
router.patch(
  "/api/products/:id",
  authenticate,
  upload.single("image"),
  adminController.updateProduct
);
// router.put("/api/orders/:id/status", adminController.updateOrderStatus);   (optional)
router.delete("/api/products/:id", authenticate, adminController.deleteProduct);

module.exports = router;
