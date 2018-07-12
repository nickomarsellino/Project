var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');

var users = require('./routes/userRouter');
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project')
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));
var db = mongoose.connection;


app.use('/api/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//Start server
const port=3000;
app.listen(port, () => {
  console.log("SERVER started on PORT:3000");
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
