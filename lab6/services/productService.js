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

const getAllProducts = async (options = {}) => {
    const {
        page = 1,
        limit = 10,
        categoryId,
        minPrice,
        maxPrice,
        search,
        sortBy = 'name',
        sortOrder = 'asc'
    } = options;

    const skip = (page - 1) * limit;
    
    const where = {};
    
    if (categoryId) {
        where.categoryId = parseInt(categoryId);
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) {
            where.price.gte = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
            where.price.lte = parseFloat(maxPrice);
        }
    }
    
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            include: {
                category: true
            },
            orderBy: {
                [sortBy]: sortOrder
            },
            skip,
            take: limit
        }),
        prisma.product.count({ where })
    ]);

    return {
        products,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getProductsByCategoryId = async (categoryId, options = {}) => {
    return getAllProducts({
        ...options,
        categoryId
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getProductsByCategoryId
};