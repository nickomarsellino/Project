const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isEmail',
        message: 'Email must be valid.'
    })
];

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    phone: {
        type: Number,
        required: [true, 'Phone Number is required.']
    },
    timestamp: {
        type    : Date,
        default : Date.now()
    }
});

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Use the unique validator plugin
UserSchema.plugin(unique, {message: 'That {PATH} is already taken.'});
module.exports = mongoose.model('User', UserSchema);
