const { pool } = require('../config/database');

const createProduct = async (productData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Перевіряємо, чи існує категорія
        const categoryResult = await client.query(
            'SELECT id FROM "Category" WHERE id = $1',
            [productData.categoryId]
        );
        
        if (categoryResult.rows.length === 0) {
            throw new Error('Category not found');
        }
        
        const result = await client.query(
            'INSERT INTO "Product" (name, description, price, "categoryId") VALUES ($1, $2, $3, $4) RETURNING *',
            [productData.name, productData.description, parseFloat(productData.price), parseInt(productData.categoryId)]
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

const updateProduct = async (id, productData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Перевіряємо, чи існує категорія
        const categoryResult = await client.query(
            'SELECT id FROM "Category" WHERE id = $1',
            [productData.categoryId]
        );
        
        if (categoryResult.rows.length === 0) {
            throw new Error('Category not found');
        }
        
        const result = await client.query(
            'UPDATE "Product" SET name = $1, description = $2, price = $3, "categoryId" = $4 WHERE id = $5 RETURNING *',
            [
                productData.name,
                productData.description,
                parseFloat(productData.price),
                parseInt(productData.categoryId),
                id
            ]
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

const deleteProduct = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const result = await client.query(
            'DELETE FROM "Product" WHERE id = $1 RETURNING *',
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

const getProduct = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT p.*, c.name as category_name FROM "Product" p JOIN "Category" c ON p."categoryId" = c.id WHERE p.id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return null;
        }
        
        const product = result.rows[0];
        product.category = {
            id: product.categoryId,
            name: product.category_name
        };
        
        delete product.categoryId;
        delete product.category_name;
        
        return product;
    } finally {
        client.release();
    }
};

const getAllProducts = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT p.*, c.name as category_name FROM "Product" p JOIN "Category" c ON p."categoryId" = c.id'
        );
        
        return result.rows.map(row => {
            const product = { ...row };
            product.category = {
                id: product.categoryId,
                name: product.category_name
            };
            
            delete product.categoryId;
            delete product.category_name;
            
            return product;
        });
    } finally {
        client.release();
    }
};

const getProductsByCategoryId = async (categoryId) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT p.*, c.name as category_name FROM "Product" p JOIN "Category" c ON p."categoryId" = c.id WHERE p."categoryId" = $1',
            [categoryId]
        );
        
        return result.rows.map(row => {
            const product = { ...row };
            product.category = {
                id: product.categoryId,
                name: product.category_name
            };
            
            delete product.categoryId;
            delete product.category_name;
            
            return product;
        });
    } finally {
        client.release();
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getProductsByCategoryId
}; 