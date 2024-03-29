var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var customerRouter = require('./routes/customerRouter');
var flowerRouter = require('./routes/flowerRouter');
var sellerRouter = require('./routes/sellerRouter'); 
var priceRouter = require('./routes/priceRouter'); 
var orderRouter = require('./routes/orderRouter'); 
var ordFlowerRouter = require('./routes/ordFlowerRouter'); 
var uploadRouter = require('./routes/uploadRouter'); 

const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to mongoDB');
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers/', customerRouter);
app.use('/flowers', flowerRouter);
app.use('/sellers', sellerRouter);
app.use('/prices', priceRouter);
app.use('/orders', orderRouter);
app.use('/ordFlowers', ordFlowerRouter);
app.use('/imageUpload', uploadRouter);

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
