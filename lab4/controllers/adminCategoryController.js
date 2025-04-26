const categoryService = require('../services/categoryService');

// Отримання списку категорій
const listCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategoriesWithSubcategories();
        const mainCategories = categories.filter(cat => !cat.parentId);
        const subCategories = categories.filter(cat => cat.parentId);

        res.render('admin/categories/index', {
            mainCategories,
            subCategories,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при отриманні категорій',
            error
        });
    }
};

// Форма створення категорії
const createForm = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.render('admin/categories/create', {
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

// Створення категорії
const create = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            parentId: req.body.categoryType === 'sub' ? parseInt(req.body.parentId) : null
        };

        await categoryService.createCategory(categoryData);
        res.redirect('/admin/categories');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при створенні категорії',
            error
        });
    }
};

// Форма редагування категорії
const editForm = async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.id);
        const categories = await categoryService.getAllCategories();
        res.render('admin/categories/edit', {
            category,
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

// Оновлення категорії
const update = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            parentId: req.body.parentId ? parseInt(req.body.parentId) : null
        };

        await categoryService.updateCategory(req.params.id, categoryData);
        res.redirect('/admin/categories');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при оновленні категорії',
            error
        });
    }
};

// Видалення категорії
const remove = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.redirect('/admin/categories');
    } catch (error) {
        res.status(500).render('error', {
            message: 'Помилка при видаленні категорії',
            error
        });
    }
};

module.exports = {
    listCategories,
    createForm,
    create,
    editForm,
    update,
    remove
}; 