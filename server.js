var express = require('express');
var app = express();
var port = process.env.PORT || 8080
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


//Configuration ======================================

//connect to datbase
mongoose.connect(configDB.url);

//pass passport for configuration
require('./config/passport')(passport);

//setup our express application

app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get information from html forms
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); //setup ejs for templating

//required for passport

app.use(session({secret: 'ilovelearnenglishpardeeplearnerenglish' }));//session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); //use connect-flash for flash messages stored in session

//routes===================================================
require('./app/routes.js')(app, passport);
//load routes and pass in app and fully configured passport

//listen 
app.listen(port);
console.log('The magic happens on port' + port);
