const productService = require('../services/productService');

// Відображення списку товарів
exports.listProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.render('products', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
