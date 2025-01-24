const express = require("express")
const productController = require("../controllers/productController");
const { signin } = require("../middleware/authMiddleware");

const router = express.Router()

router.get("/", productController.getAllProduct)

router.get("/id/:id", signin, productController.findProductById)

// Admin
router.post("/", signin, productController.createProduct)

router.put("/:id", signin, productController.updateProduct)

router.delete("/:id", signin, productController.deleteProduct)

module.exports = router