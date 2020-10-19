const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');
require('dotenv').config()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const productsRouter = require('./routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);


//===================================================login check middleware===================================
// Middleware Authentication
app.use( ( req, res, next ) => {
  // Check if it's not login page and my-token cookie is not existed > redirect to login page
  if ( '/login' !== req.path && ! req.cookies.hasOwnProperty( 'my-token' ) ) {
    return res.redirect( 'http://localhost:5000/login' );
  }
  // Check if it's login page and my-token is existed > redirect to home page
  else if ( '/login' === req.path && req.cookies.hasOwnProperty( 'my-token' ) ) {
    return res.redirect( 'http://localhost:5000/' );
  }

  next();
} );
//===================================================check environment variables definition===================================
if(!process.env.presto_jwtPrivateKey)
{
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose.connect("mongodb://localhost/prestodb")
    .then(()=> console.log('connected to mongodb...'))
    .catch(()=> console.log('could not connect to mongodb...'))

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
