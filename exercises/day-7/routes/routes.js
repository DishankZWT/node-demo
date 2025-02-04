const express = require("express");
const path = require("path");
const { upload } = require("../utilities/multer");
const authenticate = require("../utilities/tokenCheck");

//Router
const router = express.Router();

//Controllers
const userController = require("../controllers/userController");
const userImageController = require("../controllers/userImageController");
const userProfileController = require("../controllers/userProfileController");

// GET ROUTES
router.get("/", userController.home);
router.get("/users", authenticate, userController.getSingleUser);
router.get("/users/:id", authenticate, userController.getUsers);
router.get("/userInfo/:id", authenticate, userController.getUsersInfo);
router.get(
  "/user-profile/:userId",
  authenticate,
  userProfileController.getUsers
);

// POST Routes
router.post("/users", authenticate, userController.createUsers);
router.post(
  "/user-images",
  authenticate,
  upload.single("image"),
  userImageController.createUsers
);
router.post("/user-profile", authenticate, userProfileController.createUsers);
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);

// PATCH/PUT Routes
router.patch("/users/:id", authenticate, userController.updateUsers);
router.put(
  "/user-profile/:userId",
  authenticate,
  userProfileController.updateUsers
);

// DELETE Routes
router.delete("/users/:id", authenticate, userController.deleteUsers);
router.delete(
  "/user-images/:userId",
  authenticate,
  userImageController.deleteUsers
);
router.delete(
  "/user-profile/:userId",
  authenticate,
  userProfileController.deleteUsers
);

module.exports = router;
