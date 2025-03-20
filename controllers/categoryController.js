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

// Відображення однієї категорії з її товарами
exports.showCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await categoryService.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send('Категорію не знайдено');
        }

        res.render('category', {
            category,
            subcategories: category.children, // Підкатегорії
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(err.message);
    }
};
