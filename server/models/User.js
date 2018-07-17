const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');

const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
];

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
        validate: usernameValidator
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
    }
});


// //hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//
//     console.log("JALAN BRO PAS SAVE");
//
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     })
// });
//
// UserSchema.pre('findByIdAndUpdate', function (next) {
//
//     console.log("JALAN BRO PAS UPDATE");
//
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     })
// });


UserSchema.methods.validPassword = function (password) {
    console.log("SESUDAH MASUK IF: " + password);
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateHash = function (password) {
    console.log("JALAN: " + password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Use the unique validator plugin
UserSchema.plugin(unique, {message: 'That {PATH} is already taken.'});
module.exports = mongoose.model('User', UserSchema);
