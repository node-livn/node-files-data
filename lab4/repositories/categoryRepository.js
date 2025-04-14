const prisma = require('../prisma/client');

// Отримання всіх категорій
exports.loadCategoriesAsync = async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                children: true,
                products: true
            },
            where: {
                parentId: null // Отримуємо тільки кореневі категорії
            }
        });
        return categories;
    } catch (err) {
        throw err;
    }
};

// Отримання категорії за ID
exports.getCategoryById = async (id) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: {
                children: true,
                products: true,
                parent: true
            }
        });
        return category;
    } catch (err) {
        throw err;
    }
};