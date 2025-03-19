const categoryRepository = require('../repositories/categoryRepository');

exports.getAllCategories = async () => {
    // Використання Promise
    return await categoryRepository.loadCategoriesAsync();
};

// Додаткові методи для роботи з категоріями
