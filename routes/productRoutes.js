const express = require("express")
const productController = require("../controllers/productController");
const { userSignin } = require("../middleware/authMiddleware");

const router = express.Router()

router.get("/", userSignin, productController.getAllProduct)

router.get("/id/:id", userSignin, productController.findProductById)

// Admin
router.post("/", userSignin, productController.createProduct)

router.put("/:id", userSignin, productController.updateProduct)

router.delete("/:id", userSignin, productController.deleteProduct)

module.exports = router