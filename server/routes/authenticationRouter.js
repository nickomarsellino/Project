const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const UserSession = require('../models/User_Session');
const Tweet = require('../models/Tweet');
const CryptoJS = require("crypto-js");
const btoa = require('btoa');
const atob = require('atob');
const cookie = require('cookie');
const secretKey = 'Lil-Uzi-Vert=XO-Tour-LIF3'
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post('/register', (req, res) => {
    const user = new User();
    // Data inputan dari FE
    const users = {
        username: req.body.username,
        email: req.body.email,
        password: user.generateHash(req.body.password),
        phone: req.body.phone,
        profilePicture: '',
        timestamp: Date.now()
    };
    User.create(users).then(function (result) {
        res.send({
            success: true,
            msg: `Successfully added!`,
            result: {
                _id: result._id,
                username: result.username,
                email: result.email,
                password: result.password,
                phone: result.phone,
                profilePicture: '',
                timestamp: new Date()
            }
        });
    }).catch((err) => {
        if (err.errors) {
            if (err.errors.username) {
                res.status(403).json({success: false, msg: err.errors.username.message});
                return;
            }
            if (err.errors.email) {
                res.status(403).json({success: false, msg: err.errors.email.message});
                return;
            }
            if (err.errors.password) {
                res.status(403).json({success: false, msg: err.errors.password.message});
                return;
            }
            if (err.errors.phone) {
                res.status(403).json({success: false, msg: err.errors.phone.message});
                return;
            }
            // Show failed if all else fails for some reasons
            res.status(403).json({success: false, msg: `Something went wrong. ${err}`});
        }
    });
});


router.post('/signin', (req, res) => {
    const {body} = req;
    const {password} = body;
    let {email} = body;
    // email = email.toLowerCase();
    // email = email.trim();

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({success: false, message: 'Error: server error'});
        }
        if (users.length != 1) {
            res.status(403).json({success: false, msg: 'Email and Password Invalid'});
            return;
        }

        const user = users[0];


        if (!user.validPassword(password)) {
            res.status(403).json({success: false, msg: 'Email and Password Invalid'});
            return;
        }

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.username = user.username;
        userSession.password = user.password;
        // One day after login
        userSession.expiredTime = Date.now() + 1 * 24 * 60 * 60 * 1000;
        //set 1 day
        //set 30 second + 30 * 1000;
        userSession.save((err, doc) => {
            if (err) {
                res.status(403).json({success: false, msg: 'Server Eror'});
                return;
            }
            const auth = JSON.stringify({
                tokenId: doc._id,
                userId: doc.userId,
                username: doc.username,
                password: doc.password,
                expiredTime: doc.expiredTime,
            });

            // Encrypt
            const ciphertext = CryptoJS.AES.encrypt(auth, secretKey);
            const token = btoa(ciphertext);

            res.setHeader('Set-Cookie', cookie.serialize('tokenId', token, {
                expires: doc.expiredTime,
                path: "/",
                httpOnly: true
            }));

            res.send(
                {success: true, message: 'Valid sign in'}
            );
        });
    });
});


router.get('/logout', (req, res, next) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    UserSession.updateMany({userId: userData.userId}, {$set: {isLogout: true}}).exec();

    res.clearCookie('tokenId');

    res.send(
        {success: true, message: 'Valid sign out'}
    );
});


router.get('/verify', (req, res, next) => {
    if (req.headers.cookie) {
        const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
        const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(plaintext);


        // Verify the token is one of a kind and it's not deleted.
        UserSession.find({
            _id: userData.tokenId
        }, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({success: false, message: 'Error: Server error'});
            }
            if (sessions.length != 1) {
                return res.send({success: false, message: 'Error: Invalid'});
            }
            else {
                const session = sessions[0];

                //Validasi Data yang ada di table session dengan yang ada di dalam token
                if (session.userId === userData.userId) {
                    if (session.isLogout) {
                        return res.send({success: false, message: 'Error: Invalid'});
                    }
                    else {
                        if (session.expiredTime > new Date(Date.now())) {
                            return res.send({success: true, message: 'Already Login'});
                        }
                        else {
                            return res.send({success: false, message: 'Error: Invalid'});
                        }
                    }
                }
                else {
                    return res.send({success: false, message: 'Error: Invalid'});
                }
            }
        });
    }

    else {
        return res.send({success: false, message: 'Belum Login & Belum ada Login'});
    }

});


module.exports = router;
