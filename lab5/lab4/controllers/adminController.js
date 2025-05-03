const adminPanel = (req, res) => {
    res.render('admin', {
        user: req.session.user
    });
};

module.exports = {
    adminPanel
}; 