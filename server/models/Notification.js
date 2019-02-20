const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userIdTarget: {
        type    : String,
        default : ''
    },
    usernameAction: {
        type    : String,
        default : ''
    },
    profileUserAction: {
        type    : String,
        default : ''
    },
    isOpened: {
        type    : Boolean,
        default : false
    },
    tweetIdTarget: {
        type    : String,
        default : ''
    },
    notificationAction: {
        type    : String,
        default : ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
