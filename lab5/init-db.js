require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

async function initDatabase() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Читаємо SQL схему
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Виконуємо SQL скрипт
        await client.query(schema);

        // Читаємо дані для ініціалізації
        const dataPath = path.join(__dirname, 'appliance_db_data.sql');
        const data = fs.readFileSync(dataPath, 'utf8');

        // Виконуємо SQL скрипт з даними
        await client.query(data);

        await client.query('COMMIT');
        console.log('База даних успішно ініціалізована');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Помилка при ініціалізації бази даних:', err);
    } finally {
        client.release();
        pool.end();
    }
}

initDatabase(); 