const index = (req, res) => {
    res.render('index', {
        user: req.session.user || null
    });
};

module.exports = {
    index
}; 