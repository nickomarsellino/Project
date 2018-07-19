const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  userId: {
      type    : String,
      default : ''
  },
  username:{
    type    : String
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
