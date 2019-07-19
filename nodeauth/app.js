var createError      = require('http-errors');
var express          = require('express');
var path             = require('path');
var logger           = require('morgan');
var expressValidator = require('express-validator');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bodyParser       = require('body-parser');
var multer           = require('multer');
var flash            = require('connect-flash');
var mongo            = require('mongodb');
var mongoose         = require('mongoose');
var redirect         = require('express-redirect');
var db               = mongoose.connection;

var indexRouter      = require('./routes/index');      // main page
var usersRouter      = require('./routes/users');       //login form or the registration form
var adminsRouter     = require('./routes/admins');
var membersRouter    = require('./routes/members');
var testtxnRouter    = require('./routes/testtxn');
var pgredirectRouter = require('./routes/pgredirect');
var responseRouter   = require('./routes/response');

var app = express();
    redirect(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle File Uploads
app.use(multer({dest:'./uploads'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle Express Sessions
app.use(session({
  secret:'secret',
  saveUninitialized:false,
  resave:false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {   // error message handler
    var namespace = param.split('.'),
            root  = namespace.shift(),
        formParam = root;

  while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg   : msg,
    value : value
    };
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   //public directory where all the static pages will be present

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

//app.use(function(req, res, next){
//    res.locals.user = req.user || null;
//    next();
//});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/members', membersRouter);
app.use('/testtxn', testtxnRouter);
app.use('/pgredirect', pgredirectRouter);
app.use('/response', responseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
