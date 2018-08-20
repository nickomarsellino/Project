const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {
        type    : String,
        default : ''
    },
    username:{
        type    : String,
        default : ''
    },
    password: {
        type    : String,
        default : ''
    },
    expiredTime: {
        type    : Date,
        default : ''
    },
    isLogout: {
        type    : Boolean,
        default : false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
