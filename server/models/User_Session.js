const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    email:{
        type    : String,
        default : ''
    },
    userId: {
        type    : String,
        default : ''
    },
    expiredTime: {
        type    : Date,
        default : ''
    },
    password: {
        type    : String,
        default : ''
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
