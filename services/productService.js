const productRepository = require('../repositories/productRepository');

exports.getAllProducts = async () => {
    // Для демонстрації використовуємо async/await спосіб завантаження даних
    return await productRepository.loadProductsAsync();
};

// Можна додати методи для створення, редагування, видалення товарів
