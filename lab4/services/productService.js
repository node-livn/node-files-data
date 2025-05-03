const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (productData) => {
    return await prisma.$transaction(async (tx) => {
        // Перевіряємо, чи існує категорія
        const category = await tx.category.findUnique({
            where: { id: parseInt(productData.categoryId) }
        });

        if (!category) {
            throw new Error('Category not found');
        }

        const product = await tx.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                categoryId: parseInt(productData.categoryId)
            }
        });
        return product;
    });
};

const updateProduct = async (id, productData) => {
    return await prisma.$transaction(async (tx) => {
        // Перевіряємо, чи існує категорія
        const category = await tx.category.findUnique({
            where: { id: parseInt(productData.categoryId) }
        });

        if (!category) {
            throw new Error('Category not found');
        }

        const product = await tx.product.update({
            where: { id: parseInt(id) },
            data: {
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                categoryId: parseInt(productData.categoryId)
            }
        });
        return product;
    });
};

const deleteProduct = async (id) => {
    return await prisma.$transaction(async (tx) => {
        const product = await tx.product.delete({
            where: { id: parseInt(id) }
        });
        return product;
    });
};

const getProduct = async (id) => {
    return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
            category: true
        }
    });
};

const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
};