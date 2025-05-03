const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Роутери
const mainRouter = require('./routes/index');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));