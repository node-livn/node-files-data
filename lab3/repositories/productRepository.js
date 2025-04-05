const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'products.json');

// Синхронний ввід
exports.loadProductsSync = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};

// Асинхронний ввід (callback)
exports.loadProductsCallback = (callback) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        try {
            const products = JSON.parse(data);
            callback(null, products);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
};

// Асинхронний ввід (Promise)
exports.loadProductsPromise = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                const products = JSON.parse(data);
                resolve(products);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};

// Асинхронний ввід (async/await)
exports.loadProductsAsync = async () => {
    try {
        const data = await fsPromises.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};
