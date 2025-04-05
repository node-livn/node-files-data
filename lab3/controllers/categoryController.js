const categoryService = require('../services/categoryService');
const { notFound } = require('../utils/errors');

// Відображення списку категорій
exports.listCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('categories', { categories });
    } catch (error) {
        next(error);
    }
};

// Відображення однієї категорії з її товарами
exports.showCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);

        if (!category) {
            throw notFound('Категорію не знайдено');
        }

        res.render('category', {
            category,
            subcategories: category.children
        });
    } catch (error) {
        next(error);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        // TODO: Реалізувати створення категорії через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        // TODO: Реалізувати оновлення категорії через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        // TODO: Реалізувати видалення категорії через сервіс
        res.status(501).json({ message: 'Not implemented yet' });
    } catch (error) {
        next(error);
    }
};
