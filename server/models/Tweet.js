const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = Schema({
    userId: {
        type: String,
        default: ''
    },
    username: {
        type: String
    },
    profilePicture: {
        type: String
    },
    tweetText: {
        type: String
    },
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    timestamp: {
        type: Date,
        default: Date.now()
    },
    checkLikes:{
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('Tweet', TweetSchema)
