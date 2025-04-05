const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');

const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

// Маршрути автентифікації
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Публічні маршрути
router.get('/', (req, res) => {
  res.render('index');
});

// Сторінка з усіма товарами
router.get('/products', productController.listProducts);

// Сторінка з категоріями
router.get('/categories', categoryController.listCategories);

// Сторінка однієї категорії
router.get('/categories/:id', categoryController.showCategory);

// Товари певної категорії
router.get('/categories/:categoryId/products', productController.listProductsByCategory);

// Адміністративні маршрути
router.post('/categories', authenticate, requireAdmin, categoryController.createCategory);
router.put('/categories/:id', authenticate, requireAdmin, categoryController.updateCategory);
router.delete('/categories/:id', authenticate, requireAdmin, categoryController.deleteCategory);

router.post('/products', authenticate, requireAdmin, productController.createProduct);
router.put('/products/:id', authenticate, requireAdmin, productController.updateProduct);
router.delete('/products/:id', authenticate, requireAdmin, productController.deleteProduct);

module.exports = router;