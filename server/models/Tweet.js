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
    timestamp: {
        type: Date,
        default: Date.now()
    },
    tweetImage: {
        type: Buffer
    }

});

module.exports = mongoose.model('Tweet', TweetSchema);
