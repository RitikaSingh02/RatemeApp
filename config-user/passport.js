var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models-mongo/models');

Passport.serializeUser((user, done) => {

    done(null, user.id);//this stores the userid into the sessionid;

})

Passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

Passport.use('local.usersignup', new LocalStrategy(
    (req, email, password, done) => {
        User.findOne({ username: email }, (err, user) => {
            if (err) { return done(err); }
            // if (!user) { return done(null, false); }
            if (user) {
                if (!user.verifyPassword(password)) { return done(null, false); }
            }
            var newUser = new User();
            newUser.fullname = req.body.fullname;
            newUser.email = req.body.email;
            // newUser.password = req.body.password;//we cant save like this we need to encrypt the pass
            newUser.password = newUser.encryptPass(req.body.password);

            newUser.save((err) => {
                return done(null, newUser);
            })
        });
    }
));