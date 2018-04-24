var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api.route')
var bluebird = require('bluebird')

var app = express();

var mongoose = require('mongoose')
//connect to local mongodb
/*mongoose.connect('mongodb://127.0.0.1:27017/gtkapp')
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/gtkapp`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/gtkapp`)})
*/
//connect to mLab
var mongoDB = 'mongodb://aiichaa:aiichaa@ds137464.mlab.com:37464/gtkapp';
mongoose.connect(mongoDB)
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://aiichaa:aiichaa@ds137464.mlab.com:37464/gtkapp`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://aiichaa:aiichaa@ds137464.mlab.com:37464/gtkapp`)});


//keep heroku awake
/*var http = require("http");
setInterval(function() {
    http.get("http://goodtoknowapp.herokuapp.com");
}, 300000); // every 5 minutes (300000)*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://goodtoknowapp-angular.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

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
app.use('/api', api);

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


