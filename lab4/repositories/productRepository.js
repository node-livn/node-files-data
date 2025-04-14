const prisma = require('../prisma/client');

// Отримання всіх продуктів
exports.loadProductsAsync = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        });
        return products;
    } catch (err) {
        throw err;
    }
};

// Отримання продукту за ID
exports.getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true
            }
        });
        return product;
    } catch (err) {
        throw err;
    }
};

// Отримання продуктів за категорією
exports.getProductsByCategoryId = async (categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: { categoryId: parseInt(categoryId) },
            include: {
                category: true
            }
        });
        return products;
    } catch (err) {
        throw err;
    }
};
