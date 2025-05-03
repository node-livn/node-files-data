const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const adminCategoryController = require('../controllers/adminCategoryController');
const adminProductController = require('../controllers/adminProductController');

// Admin panel
router.get('/', isAdmin, adminController.adminPanel);

// Category routes
router.get('/categories', isAdmin, adminCategoryController.listCategories);
router.post('/categories', isAdmin, adminCategoryController.create);
router.put('/categories/:id', isAdmin, adminCategoryController.update);
router.delete('/categories/:id', isAdmin, adminCategoryController.remove);

// Product routes
router.get('/products', isAdmin, adminProductController.listProducts);
router.post('/products', isAdmin, adminProductController.create);
router.put('/products/:id', isAdmin, adminProductController.update);
router.delete('/products/:id', isAdmin, adminProductController.remove);

module.exports = router; 