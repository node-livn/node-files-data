const categoryService = require('./categoryService');
const productRepository = require('../repositories/productRepository');

exports.getAllProducts = async () => {
    return await productRepository.loadProductsAsync();
};

// Пошук товару за ID
exports.getProductById = async (productId) => {
    return await productRepository.getProductById(productId);
};

// Отримання товарів з конкретної категорії
exports.getProductsByCategoryId = async (categoryId) => {
    return await productRepository.getProductsByCategoryId(categoryId);
};