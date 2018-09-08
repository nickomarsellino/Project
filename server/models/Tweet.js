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
    like: [{
        userId: { type: String }
    }],
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Tweet', TweetSchema)
