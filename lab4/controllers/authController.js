const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).render('error', {
                message: 'Невірний email або пароль',
                error: new Error('Invalid credentials')
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).render('error', {
                message: 'Невірний email або пароль',
                error: new Error('Invalid credentials')
            });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        res.redirect('/admin');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('error', {
            message: 'Помилка при вході в систему',
            error
        });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', {
                message: 'Помилка при виході з системи',
                error: err
            });
        }
        res.redirect('/');
    });
};

module.exports = {
    login,
    logout
}; 