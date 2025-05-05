const { pool } = require('../config/database');

const createCategory = async (categoryData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const result = await client.query(
            'INSERT INTO "Category" (name, "parentId") VALUES ($1, $2) RETURNING *',
            [categoryData.name, categoryData.parentId]
        );
        
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateCategory = async (id, categoryData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const result = await client.query(
            'UPDATE "Category" SET name = $1, "parentId" = $2 WHERE id = $3 RETURNING *',
            [categoryData.name, categoryData.parentId, id]
        );
        
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const deleteCategory = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Перевіряємо наявність дочірніх категорій
        const childCategories = await client.query(
            'SELECT id FROM "Category" WHERE "parentId" = $1',
            [id]
        );
        
        if (childCategories.rows.length > 0) {
            throw new Error('Cannot delete category with child categories');
        }
        
        // Перевіряємо наявність товарів
        const products = await client.query(
            'SELECT id FROM "Product" WHERE "categoryId" = $1',
            [id]
        );
        
        if (products.rows.length > 0) {
            throw new Error('Cannot delete category with associated products');
        }
        
        const result = await client.query(
            'DELETE FROM "Category" WHERE id = $1 RETURNING *',
            [id]
        );
        
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getCategory = async (id) => {
    const client = await pool.connect();
    try {
        // Отримуємо основну категорію
        const categoryResult = await client.query(
            'SELECT * FROM "Category" WHERE id = $1',
            [id]
        );
        
        if (categoryResult.rows.length === 0) {
            return null;
        }
        
        const category = categoryResult.rows[0];
        
        // Отримуємо батьківську категорію
        if (category.parentId) {
            const parentResult = await client.query(
                'SELECT * FROM "Category" WHERE id = $1',
                [category.parentId]
            );
            category.parent = parentResult.rows[0];
        }
        
        // Отримуємо дочірні категорії
        const childrenResult = await client.query(
            'SELECT * FROM "Category" WHERE "parentId" = $1',
            [id]
        );
        category.children = childrenResult.rows;
        
        // Отримуємо товари
        const productsResult = await client.query(
            'SELECT * FROM "Product" WHERE "categoryId" = $1',
            [id]
        );
        category.products = productsResult.rows;
        
        return category;
    } finally {
        client.release();
    }
};

const getAllCategories = async () => {
    const client = await pool.connect();
    try {
        // Отримуємо тільки головні категорії
        const result = await client.query(
            'SELECT * FROM "Category" WHERE "parentId" IS NULL'
        );
        
        // Для кожної категорії отримуємо підкатегорії
        const categories = result.rows;
        for (const category of categories) {
            const childrenResult = await client.query(
                'SELECT * FROM "Category" WHERE "parentId" = $1',
                [category.id]
            );
            category.children = childrenResult.rows;
        }
        
        return categories;
    } finally {
        client.release();
    }
};

const getAllCategoriesWithSubcategories = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM "Category"');
        const categories = result.rows;
        
        // Додаємо зв'язки для кожної категорії
        for (const category of categories) {
            if (category.parentId) {
                const parentResult = await client.query(
                    'SELECT * FROM "Category" WHERE id = $1',
                    [category.parentId]
                );
                category.parent = parentResult.rows[0];
            }
            
            const childrenResult = await client.query(
                'SELECT * FROM "Category" WHERE "parentId" = $1',
                [category.id]
            );
            category.children = childrenResult.rows;
            
            const productsResult = await client.query(
                'SELECT * FROM "Product" WHERE "categoryId" = $1',
                [category.id]
            );
            category.products = productsResult.rows;
        }
        
        return categories;
    } finally {
        client.release();
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
    getAllCategoriesWithSubcategories
}; 