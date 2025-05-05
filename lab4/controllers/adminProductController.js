const productService = require('../services/sqlProductService');
const categoryService = require('../services/sqlCategoryService');

// Отримання списку товарів
const listProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.render('admin/products/index', {
            products,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при отриманні товарів',
            error
        });
    }
};

// Форма створення товару
const createForm = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('admin/products/create', {
            categories,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при завантаженні форми',
            error
        });
    }
};

// Створення товару
const create = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryId: req.body.categoryId
        };

        await productService.createProduct(productData);
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при створенні товару',
            error
        });
    }
};

// Форма редагування товару
const editForm = async (req, res) => {
    try {
        const product = await productService.getProduct(req.params.id);
        const categories = await categoryService.getAllCategories();
        res.render('admin/products/edit', {
            product,
            categories,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при завантаженні форми',
            error
        });
    }
};

// Оновлення товару
const update = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryId: req.body.categoryId
        };

        await productService.updateProduct(req.params.id, productData);
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при оновленні товару',
            error
        });
    }
};

// Видалення товару
const remove = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при видаленні товару',
            error
        });
    }
};

module.exports = {
    listProducts,
    createForm,
    create,
    editForm,
    update,
    remove
}; 