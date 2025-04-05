const express = require('express');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const app = express();

// Middleware для парсингу JSON
app.use(express.json());

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware для статичних файлів
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

// Роутер
const router = require('./routes/index');
app.use('/', router);

// Обробник помилок (має бути останнім middleware)
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));