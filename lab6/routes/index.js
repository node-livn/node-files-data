const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const indexController = require('../controllers/indexController');

// Home page
router.get('/', indexController.index);

// Product routes
router.get('/products', productController.listProducts);
router.get('/categories/:categoryId/products', productController.listProductsByCategory);

// Category routes
router.get('/categories', categoryController.listCategories);
router.get('/categories/:id', categoryController.showCategory);

module.exports = router;