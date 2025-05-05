const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).render('error', {
        message: 'Для доступу до цієї сторінки потрібна авторизація',
        error: new Error('Authentication required')
    });
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).render('error', {
        message: 'Доступ заборонено. Потрібні права адміністратора',
        error: new Error('Admin privileges required')
    });
};

module.exports = {
    isAuthenticated,
    isAdmin
}; 