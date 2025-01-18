const express = require("express")
const userController = require("../controllers/userController")
const { userSignin } = require("../middleware/authMiddleware")

const router = express.Router();

// This route handles GET requests for All user
router.get("/", userController.getAllUser)

// This route handles GET requests for user profile
router.get("/profile", userSignin, userController.getUserById)

module.exports = router