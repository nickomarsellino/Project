const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const userRoutes = require('./routes/userRouter');
const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors({origin:'http://localhost:3000', methods:['GET', 'PUT', 'POST']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static('uploads'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project').then(() => console.log('connection succesful')).catch((err) => console.error(err));
const db = mongoose.connection;

app.use('/api/users', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Start server
const port = 3000;
app.listen(port, () => {
  console.log("SERVER started on PORT:3000");
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
