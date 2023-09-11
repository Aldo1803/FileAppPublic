const express = require('express');
const TempObjController = require("../Controllers/tempObj");
const UserController = require("../Controllers/user");
const AuthMiddleware = require("../Middlewares/authentication");
const Verify = require("../services/token-verify");
const router = express.Router();

// User routes
router.post("/users", UserController.signUp);  // Create a new user
router.post("/users/login", UserController.logIn);  // Log in a user

// Obj routes (consider renaming 'Obj' to a more descriptive resource name if possible)
router.post("/objects", AuthMiddleware.Auth, TempObjController.createObj);  // Create a new object
router.get("/objects", AuthMiddleware.Auth, TempObjController.getObjs);  // Retrieve all objects for a user
router.get("/objects/:id", AuthMiddleware.Auth, TempObjController.getObj);  // Retrieve a specific object by ID

// Token verification
router.get("/verify", Verify.TokenVerify);  // Verify the token

module.exports = router;
