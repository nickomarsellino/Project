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
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    tweetPicture: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    checkLikes:{
      type: Boolean,
      default: false
    }
});

TweetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Tweet', TweetSchema)
