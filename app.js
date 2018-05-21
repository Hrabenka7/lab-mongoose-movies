// ##################################### FIRST PAGE TO START ########################## //

// define constants
const express = require('express'); // import Express framework module
const path = require('path'); // import {ath module - provides utilities for working with file and directory paths.
const mongoose = require('mongoose'); // imports Mongoose object modeling module
const indexRouter = require('./routes/index');
// const bodyParser = require('body-parser');

/* const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors'); */

// connect to db
mongoose.connect('mongodb://localhost/mongoose-codealong-movies');

// call express module
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// app.use(bodyParser.urlencoded({ extended: true })); // can retrieve one column of a table row
/* app.use(logger('dev'));
app.use(cookieParser()); */

// -- 404 and error handler
// NOTE: requires a views/not-found.ejs template

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
