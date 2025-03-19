const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'categories.json');

// Синхронний ввід
exports.loadCategoriesSync = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};

// Асинхронний ввід (callback)
exports.loadCategoriesCallback = (callback) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        try {
            const categories = JSON.parse(data);
            callback(null, categories);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
};

// Асинхронний ввід (Promise)
exports.loadCategoriesPromise = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                const categories = JSON.parse(data);
                resolve(categories);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};

// Асинхронний ввід (async/await)
exports.loadCategoriesAsync = async () => {
    try {
        const data = await fsPromises.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};
