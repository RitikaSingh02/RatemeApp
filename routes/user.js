module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.render('index', { 'title': "RATEmE ||INDEX" });
    })

    app.get('/user/signup', (req, res, next) => {
        res.render('user-login-signup/signup', { 'title': "SIGNUP" });
    })

    app.get('/user/login', (req, res, next) => {
        res.render('user-login-signup/login', { 'title': "LOGIN" });
    })
}