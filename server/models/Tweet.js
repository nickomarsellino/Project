const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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
    tweetPicture: {
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

TweetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Tweet', TweetSchema)
