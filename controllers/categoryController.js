const categoryService = require('../services/categoryService');

// Відображення списку категорій
exports.listCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('categories', { categories });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
