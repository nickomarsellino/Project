const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  userId: {
      type    : String,
      default : ''
  },
  tweet: {
    type    : String,
    require : [true, 'Tweet cannot be empty.']
  },
  timestamp: {
    type    : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);
