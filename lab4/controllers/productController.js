const productService = require('../services/sqlProductService');

// Відображення списку всіх товарів
exports.listProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        if (!products || products.length === 0) {
            return res.render('products', { products: [] });
        }
        res.render('products', { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send('Помилка отримання списку товарів.');
    }
};

// Відображення товарів конкретної категорії
exports.listProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await productService.getProductsByCategoryId(categoryId);
        res.render('categoryProducts', { products, categoryId });
    } catch (err) {
        res.status(500).send(err.message);
    }
};