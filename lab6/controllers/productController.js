const productService = require('../services/productService');

// Get all products with pagination and filters
exports.listProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            categoryId,
            minPrice,
            maxPrice,
            search,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        const result = await productService.getAllProducts({
            page: parseInt(page),
            limit: parseInt(limit),
            categoryId,
            minPrice,
            maxPrice,
            search,
            sortBy,
            sortOrder
        });

        res.json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            success: false,
            error: 'Error fetching products list'
        });
    }
};

// Get products by category with pagination and filters
exports.listProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const {
            page = 1,
            limit = 10,
            minPrice,
            maxPrice,
            search,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        const result = await productService.getProductsByCategoryId(categoryId, {
            page: parseInt(page),
            limit: parseInt(limit),
            minPrice,
            maxPrice,
            search,
            sortBy,
            sortOrder
        });

        res.json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};