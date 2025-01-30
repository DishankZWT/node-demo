const express = require("express");
const path = require("path");

//Router
const router = express.Router();

//Controllers
const userController = require("../controllers/controllers");

// User GET ROUTES
router.get("/", userController.home);
router.get("/users", userController.getSingleUser);
router.get("/users/:id", userController.getUsers);
// router.get("/userInfo/:userId", userController.getUserInfo);

// User POST Routes
router.post("/users", userController.createUsers);

// User PATCH Routes
router.patch("/users/:id", userController.updateUsers);

// User DELETE Routes
router.delete("/users/:id", userController.deleteUsers);
// router.delete("/userInfo/:userId", userController.deleteUserInfo);

module.exports = router;
