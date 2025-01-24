const express = require("express")
const userController = require("../controllers/userController")
const { signin } = require("../middleware/authMiddleware")

const router = express.Router();

// This route handles GET requests for All user
router.get("/", userController.getAllUser)

// This route handles GET requests for user profile
router.get("/profile", signin, userController.getUserById)

module.exports = router