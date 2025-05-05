const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM "User" WHERE email = $1',
            [email]
        );
        return result.rows[0] || null;
    } finally {
        client.release();
    }
};

const createUser = async (userData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const result = await client.query(
            'INSERT INTO "User" (email, password, role) VALUES ($1, $2, $3) RETURNING *',
            [userData.email, hashedPassword, userData.role || 'user']
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

module.exports = {
    findUserByEmail,
    createUser
}; 