const categoryService = require('../services/categoryService');
const Category = require('../models/category');

// Відображення списку категорій
exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Відображення однієї категорії з її товарами
exports.showCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: 'Помилка створення категорії' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: 'Помилка оновлення категорії' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.json({ message: 'Категорія видалена' });
    } catch (error) {
        res.status(400).json({ message: 'Помилка видалення категорії' });
    }
};
