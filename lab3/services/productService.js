const categoryService = require('./categoryService');
const productRepository = require('../repositories/productRepository');

exports.getAllProducts = async () => {
    // Отримуємо всі товари напряму з productRepository
    return await productRepository.loadProductsAsync();
};


// Пошук товару за ID
exports.getProductById = async (productId) => {
    const allProducts = await this.getAllProducts();
    return allProducts.find(product => product.id === parseInt(productId)) || null;
};

// Отримання товарів з конкретної категорії
exports.getProductsByCategoryId = async (categoryId) => {
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) return [];
    
    return category.products || [];
};