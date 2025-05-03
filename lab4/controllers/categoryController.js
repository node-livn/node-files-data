const categoryService = require('../services/categoryService');

// Відображення списку категорій
exports.listCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('categories', { 
            categories,
            user: req.session.user || null
        });
    } catch (err) {
        res.status(500).render('error', {
            message: 'Помилка при отриманні категорій',
            error: err
        });
    }
};

// Відображення однієї категорії з її товарами
exports.showCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategory(categoryId);

        if (!category) {
            return res.status(404).render('error', {
                message: 'Категорію не знайдено',
                error: new Error('Category not found')
            });
        }

        res.render('category', {
            category,
            subcategories: category.children,
            user: req.session.user || null
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).render('error', {
            message: 'Помилка при отриманні категорії',
            error: err
        });
    }
};
