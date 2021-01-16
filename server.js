var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');//session middleware for express

var app = express();

app.use(express.static('public'));//this sets our public folder for static file

app.engine('ejs', engine);// this sets the template enfgine of our server to be EJS
app.set('view engine', 'ejs');// this sets the view engine of EJS that is alfer this we create a folder names views and it get automaticallyy accessed
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));//for accepting only utf-18 data
app.use(bodyParser.json());
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. 
// This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.

app.get('/', (req, res, next) => {
    res.render('index');
})

app.listen(3000, () => {
    console.log('app running on 3000');
})