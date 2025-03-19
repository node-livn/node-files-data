const express = require('express');
const path = require('path');
const app = express();

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Роутер
const router = require('./routes/index');
app.use('/', router);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));
