const productService = require('../services/productService');
const categoryService = require('../services/categoryService');

// Get all products
const listProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error fetching products'
        });
    }
};

// Create product
const create = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryId: req.body.categoryId
        };

        const product = await productService.createProduct(productData);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error creating product'
        });
    }
};

// Update product
const update = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryId: req.body.categoryId
        };

        const product = await productService.updateProduct(req.params.id, productData);
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error updating product'
        });
    }
};

// Delete product
const remove = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error deleting product'
        });
    }
};

module.exports = {
    listProducts,
    create,
    update,
    remove
}; 