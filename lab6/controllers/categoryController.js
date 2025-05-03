const categoryService = require('../services/categoryService');

// Get all categories
exports.listCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Error fetching categories'
        });
    }
};

// Get single category with its products
exports.showCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategory(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: {
                category,
                subcategories: category.children
            }
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            error: 'Error fetching category'
        });
    }
};
