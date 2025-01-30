const express = require("express");
const path = require("path");

//Router
const router = express.Router();

//Controllers
const userController = require("../controllers/userController");

//validators
const {
  idValidator,
  userValidator,
  userProfileValidator,
} = require("../validators/validations");

//schemas
const { idSchema, userSchema, userProfileSchema } = require("../schema/schema");

// User GET ROUTES
router.get("/", userController.home);
router.get("/users", userController.getUsers);
router.get("/users/:id", idValidator, userController.getUserInfo);
router.get("/user-profile/:id", idValidator, userController.getUserProfileById);

// User POST Routes
router.post("/users", userValidator, userController.createUser);
router.post(
  "/user-profile",
  userProfileValidator,
  userController.createUserProfile
);

// User PATCH Routes
router.patch("/users/:id", idValidator, userController.updateUser);

// User DELETE Routes
router.delete("/users/:id", idValidator, userController.deleteUser);
router.delete(
  "/user-profile/:id",
  idValidator,
  userController.deleteUserProfile
);
router.delete("/user-images/:userId", userController.deleteUserImages);

//User Profile PUT Routes
router.put(
  "/user-profile/:id",
  idValidator,
  userProfileValidator,
  userController.updateUserProfile
);

module.exports = router;
