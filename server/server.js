const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const app = express();

const userRoutes = require('./routes/userRouter');
const authenticationRoutes = require('./routes/authenticationRouter');
const tweetsRoutes = require('./routes/tweetsRouter');
const messageRouter = require('./routes/messageRouter');

app.use(logger('dev'));
app.use(helmet());
app.use(cors({origin:'http://localhost:3000', methods:['GET', 'PUT', 'POST']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'build')));
// app.use('/uploads', express.static('uploads'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project').then(() => console.log('connection succesful')).catch((err) => console.error(err));
const db = mongoose.connection;

app.use('/api/authentication', authenticationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tweet', tweetsRoutes);
app.use('/api/inbox', messageRouter);

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

const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('a new user connected, with Id:', socket.id);
  // Memastikan emit tsb telah terkirim dari client (front end)
  socket.on('sendTheData', (data) => {
    console.log("GETDATA CUY ",data);
    socket.broadcast.emit('getData', data)
    socket.emit('getData', data);
    // io.sockets.emit('bebas1', data);
  });

  socket.on('sendLike', (data) => {
    socket.broadcast.emit(data.tweetId+'like', data)
    socket.emit(data.tweetId+'like', data);
  });

  socket.on('unlike', (data) => {
    socket.broadcast.emit(data.tweetId+"unlike", data)
    socket.emit(data.tweetId+"unlike", data);
  });

  socket.on('sendComment', (data) => {
    socket.broadcast.emit('getComment', data)
      socket.broadcast.emit(data.tweetId+"getCommentLength", data)
    socket.emit('getComment', data);
      socket.emit(data.tweetId+"getCommentLength", data);
  });

  socket.on('deleteComment', (data) => {
    socket.broadcast.emit("deleteComment" ,data)
      socket.broadcast.emit(data.tweetId+"deleteCommentLength", data)
    socket.emit("deleteComment", data);
      socket.emit(data.tweetId+"deleteCommentLength", data);
  });

});

io.listen(8000);

module.exports = app;
