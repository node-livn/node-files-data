const productService = require('../services/productService');
const Product = require('../models/product');

// Відображення списку всіх товарів
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Відображення товарів конкретної категорії
exports.listProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryId }).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Помилка створення продукту' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: 'Помилка оновлення продукту' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }
        res.json({ message: 'Продукт видалено' });
    } catch (error) {
        res.status(400).json({ message: 'Помилка видалення продукту' });
    }
};