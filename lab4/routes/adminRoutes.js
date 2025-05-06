const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const adminCategoryController = require('../controllers/adminCategoryController');
const adminProductController = require('../controllers/adminProductController');

// Головна сторінка адмін-панелі
router.get('/', isAdmin, adminController.adminPanel);

// Роути для управління категоріями
router.get('/categories', isAdmin, adminCategoryController.listCategories);
router.get('/categories/create', isAdmin, adminCategoryController.createForm);
router.post('/categories', isAdmin, adminCategoryController.create);
router.get('/categories/:id/edit', isAdmin, adminCategoryController.editForm);
router.post('/categories/:id', isAdmin, adminCategoryController.update);
router.post('/categories/:id/delete', isAdmin, adminCategoryController.remove);

// Роути для управління товарами
router.get('/products', isAdmin, adminProductController.listProducts);
router.get('/products/create', isAdmin, adminProductController.createForm);
router.post('/products', isAdmin, adminProductController.create);
router.get('/products/:id/edit', isAdmin, adminProductController.editForm);
router.post('/products/:id', isAdmin, adminProductController.update);
router.post('/products/:id/delete', isAdmin, adminProductController.remove);

module.exports = router; 