var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');//session middleware for express
var mongoose = require('mongoose');
var Mongostore = require('connect-mongo')(session);
var Passport = require('passport');
var Flash = require('connect-flash');
const passport = require('passport');


var app = express();

app.use(express.static('public'));//this sets our public folder for static file

mongoose.connect('mongodb://localhost/rateme');

require('./config-user/passport');

app.engine('ejs', engine);// this sets the template enfgine of our server to be EJS
app.set('view engine', 'ejs');// this sets the view engine of EJS that is alfer this we create a folder names views and it get automaticallyy accessed
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));//for accepting only utf-18 data
app.use(bodyParser.json());
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. 
// This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.

app.use(session({
    secret: "SECRETKEY:RIZ",
    resave: false,
    //Forces the session to  be saved back to the session store ONLY IF the session was  modified during the request
    saveUninitialized: false,
    //Forces a session that is "uninitialized" to NOT be saved to the store. 
    //A session is uninitialized when it is new but not modified. 
    //in short if the session is created newest that is it is not logged in then do not save ot to the db
    store: new Mongostore({ mongooseConnection: mongoose.connection })
}))

app.use(Flash());

app.use(Passport.initialize());
app.use(Passport.session());

require('./routes/user')(app);

app.listen(3000, () => {
    console.log('app running on 3000');
})