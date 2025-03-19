const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

// Головна сторінка
router.get('/', (req, res) => {
  res.render('index');
});

// Сторінка з товарами
router.get('/products', productController.listProducts);

// Сторінка з категоріями
router.get('/categories', categoryController.listCategories);

module.exports = router;
