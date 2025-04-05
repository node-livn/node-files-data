const productService = require('../services/productService');
const { notFound } = require('../utils/errors');

// Відображення списку всіх товарів
exports.listProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.render('products', { products });
    } catch (error) {
        next(error);
    }
};

// Відображення товарів конкретної категорії
exports.listProductsByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await productService.getProductsByCategoryId(categoryId);
        res.render('categoryProducts', { products, categoryId });
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // TODO: Реалізувати створення продукту через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        // TODO: Реалізувати оновлення продукту через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        // TODO: Реалізувати видалення продукту через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};