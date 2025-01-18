const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router();

// This route handles POST requests for user registration
router.post("/register", authController.register)

// This route handles POST requests for user login
router.post("/login", authController.login)


module.exports = router