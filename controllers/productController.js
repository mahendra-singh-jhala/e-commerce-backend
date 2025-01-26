const Product = require("../models/productModel")
const Category = require("../models/categoryModel")

// Controller function for create product
exports.createProduct = async (req, res) => {
    const { imageUrl, brand, title, color, discountedPrice, price, discountPersent, size, quantity, topLevelCategory, secondLevelCategory, thirdLevelCategory, description} = req.body
    try { 
        let topLevel = await Category.findOne({ name: topLevelCategory });
        if (!topLevel) {
            topLevel = new Category({
                name: topLevelCategory,
                level: 1
            })
            await topLevel.save();
        }
        
        let secondLevel = await Category.findOne({ name: secondLevelCategory, parentCategory: topLevel._id })
        if (!secondLevel) {
            secondLevel = new Category({
                name: secondLevelCategory,
                parentCategory: topLevel._id,
                level: 2
            })
            await secondLevel.save();
        }
    
        let thirdLevel = await Category.findOne({ name: thirdLevelCategory, parentCategory: secondLevel._id});
        if (!thirdLevel) {
            thirdLevel = new Category({
                name: thirdLevelCategory,
                parentCategory: secondLevel._id,
                level: 3
            })
            await thirdLevel.save()
        }

        const product = new Product({
            title: title,
            color: color,
            price: price,
            description: description,
            discountedPrice: discountedPrice,
            discountPersent: discountPersent,
            brand: brand,
            imageUrl: imageUrl,
            quantity: quantity,
            sizes: size,
            category: thirdLevel._id,
        })

        await product.save()
        res.status(200).json({
            message: "Product Create Sucssesfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

// Controller function for update product
exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            message: "Product Updated Sucssesfully",
            updateProduct
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}

// Controller function for delete product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        await Product.findByIdAndDelete(productId)
        res.status(200).json({
            message: "Product delete Sucssesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}

// user
// Controller function for find product by ID
exports.findProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId).populate("category").exec()
        if (!product) {
            return res.status(400).json({
                message: "Product Not Found"
            })
        }
        
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

// Controller function for get all product
exports.getAllProduct = async (req, res) => {
    const { category, color, sizes, minPrice, maxPrice, pageNumber, pageSize } = req.query

    const currentPage = pageNumber ? Math.max(1, parseInt(pageNumber)) : 1
    const size = pageSize ? parseInt(pageSize) : 10
    try {
        let query = Product.find().populate("category")
        if (category) {
            const existCategory = await Category.findOne({ name: category });
            if (existCategory) {
                query = query.where("category").equals(existCategory._id);
            } else {
                return res.status(200).json({ content: [], currentPage: 1, totalPages: 0 });
            }
        }

        if (color) {
            const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
            const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
            query = query.where("color").regex(colorRegex);
        }

        if (sizes) {
            const sizesSet = new Set(sizes);
            query = query.where("size.name").in([...sizesSet]);
        }

        if (minPrice && maxPrice) {
            query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
        }

        const totalProduct = await Product.countDocuments(query);
        const skip = (currentPage - 1) * size;
        query = query.skip(skip).limit(size);

        const products = await query.exec();
        const totalPages = Math.ceil(totalProduct / size);
        res.status(200).json({
            content: products,
            currentPage,
            totalPages
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        });
    }
}