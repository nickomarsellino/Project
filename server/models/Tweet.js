const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  userId: {
      type    : String,
      default : ''
  },
  tweetText: {
    type    : String
  },
  timestamp: {
    type    : Date,
    default : Date.now()
  },
  isDeleted: {
    type    : Boolean,
    default : false
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);
