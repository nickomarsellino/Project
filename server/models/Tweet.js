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
    comments:[{
        userId: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        username: {
            type: String
        },
        commentText: {
            type: String
        },
        profilePicture:{
            type: String
        },
        commentTimestamp: {
            type: Date,
            default: Date.now()
        }
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
