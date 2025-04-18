const categoryRepository = require('../repositories/categoryRepository');
const productRepository = require('../repositories/productRepository');

exports.getAllCategories = async () => {
    return await categoryRepository.loadCategoriesAsync();
};

// Отримання всіх товарів з усіх категорій
exports.getAllProducts = async () => {
    return await productRepository.loadProductsAsync();
};

// Отримання категорії за ID
exports.getCategoryById = async (id) => {
    return await categoryRepository.getCategoryById(id);
};
