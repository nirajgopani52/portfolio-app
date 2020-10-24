// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    },
    redirectAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/');
        next();
    }
};
