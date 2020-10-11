//File: App.js
//Name: Niraj gopani

let createError = require('http-errors'); //for catching error use http-error package
let express = require('express'); //use express for web app
let path = require('path');

let indexRouter = require('./routes/index'); //create multiple route in one file

let app = express(); // call express



app.set('views', path.join(__dirname, 'views')); //add view part in express
app.set('view engine', 'ejs'); // for view part used ejs template

app.use(express.static('public')) //public directory connect

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //public directory connect
app.use(express.static(path.join(__dirname, 'node_modules'))); //node_modules directory connect

app.use('/', indexRouter); // call route for starting app



app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page....
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
