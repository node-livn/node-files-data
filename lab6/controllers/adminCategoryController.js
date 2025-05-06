const categoryService = require('../services/categoryService');

// Get all categories
const listCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategoriesWithSubcategories();
        const mainCategories = categories.filter(cat => !cat.parentId);
        const subCategories = categories.filter(cat => cat.parentId);

        res.json({
            success: true,
            data: {
                mainCategories,
                subCategories
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error fetching categories'
        });
    }
};

// Create category
const create = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            parentId: req.body.categoryType === 'sub' ? parseInt(req.body.parentId) : null
        };

        const category = await categoryService.createCategory(categoryData);
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error creating category'
        });
    }
};

// Update category
const update = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            parentId: req.body.parentId ? parseInt(req.body.parentId) : null
        };

        const category = await categoryService.updateCategory(req.params.id, categoryData);
        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error updating category'
        });
    }
};

// Delete category
const remove = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error deleting category'
        });
    }
};

module.exports = {
    listCategories,
    create,
    update,
    remove
}; 