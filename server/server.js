const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const socketIo = require('socket.io');
const http = require('http');
const users = require('./routes/userRouter');
const app = express();

// const server = http.createServer(app);
// const io = socketIo(server);
//
// io.on('connection', (socket) => {
//     console.log(socket.id);
//
//     socket.on('SEND_MESSAGE', function(data){
//         io.emit('RECEIVE_MESSAGE', data);
//     })
// });

app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'build')));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project').then(() => console.log('connection succesful')).catch((err) => console.error(err));
const db = mongoose.connection;

app.use('/api/users', users);

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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
