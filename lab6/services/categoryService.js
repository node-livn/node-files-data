const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (categoryData) => {
    return await prisma.$transaction(async (tx) => {
        const category = await tx.category.create({
            data: categoryData
        });
        return category;
    });
};

const updateCategory = async (id, categoryData) => {
    return await prisma.$transaction(async (tx) => {
        const category = await tx.category.update({
            where: { id: parseInt(id) },
            data: categoryData
        });
        return category;
    });
};

const deleteCategory = async (id) => {
    return await prisma.$transaction(async (tx) => {
        // Спочатку перевіряємо, чи є дочірні категорії
        const childCategories = await tx.category.findMany({
            where: { parentId: parseInt(id) }
        });

        if (childCategories.length > 0) {
            throw new Error('Cannot delete category with child categories');
        }

        // Перевіряємо, чи є товари в цій категорії
        const products = await tx.product.findMany({
            where: { categoryId: parseInt(id) }
        });

        if (products.length > 0) {
            throw new Error('Cannot delete category with associated products');
        }

        const category = await tx.category.delete({
            where: { id: parseInt(id) }
        });
        return category;
    });
};

const getCategory = async (id) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
        include: {
            parent: true,
            children: true,
            products: true
        }
    });
};

const getAllCategories = async () => {
    return await prisma.category.findMany({
        where: {
            parentId: null // Тільки головні категорії
        },
        include: {
            children: true // Включаємо підкатегорії для відображення
        }
    });
};

const getAllCategoriesWithSubcategories = async () => {
    return await prisma.category.findMany({
        include: {
            parent: true,
            children: true,
            products: true
        }
    });
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
    getAllCategoriesWithSubcategories
};
