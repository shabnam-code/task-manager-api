const express = require("express");
const userController = require("../service/userService");
const router = express.Router();

// User routes
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
