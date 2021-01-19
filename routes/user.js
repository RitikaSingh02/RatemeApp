const passport = require("passport");

module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.render('index', { 'title': "RATEmE ||INDEX" });
    })

    app.get('/user/signup', (req, res, next) => {
        res.render('user-login-signup/signup', { 'title': "SIGNUP" });
    })

    app.post('/user/signup', passport.authenticate('local.usersignup', {
        successRedirect: "/",
        failureRedirect: "/user/signup",
        failureFlash: true,
    }));

    app.get('/user/login', (req, res, next) => {
        res.render('user-login-signup/login', { 'title': "LOGIN" });
    })
}