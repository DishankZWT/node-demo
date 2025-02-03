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
router.get("/users/:id", userController.getUsers);
router.get("/userInfo/:id", userController.getUsersInfo);
router.get("/user-profile/:userId", userProfileController.getUsers);

// POST Routes
router.post("/users", userController.createUsers);
router.post(
  "/user-images",
  upload.single("image"),
  userImageController.createUsers
);
router.post("/user-profile", userProfileController.createUsers);
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);

// PATCH/PUT Routes
router.patch("/users/:id", userController.updateUsers);
router.put("/user-profile/:userId", userProfileController.updateUsers);

// DELETE Routes
router.delete("/users/:id", userController.deleteUsers);
router.delete("/user-images/:userId", userImageController.deleteUsers);
router.delete("/user-profile/:userId", userProfileController.deleteUsers);

module.exports = router;
