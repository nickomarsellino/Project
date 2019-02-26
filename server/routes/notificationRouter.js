const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Notification = require('../models/Notification');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const btoa = require('btoa');
const atob = require('atob');
const cookie = require('cookie');
const secretKey = 'Lil-Uzi-Vert=XO-Tour-LIF3'
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/pushNotificationAction/:id', (req, res) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    // Data inputan dari FE
    const notifications = {
        userIdTarget: req.body.userId,
        usernameAction: userData.username,
        profileUserAction: req.body.profileUserAction,
        isOpened: false,
        tweetIdTarget: req.params.id,
        notificationAction: req.body.notificationAction,
        timestamp: Date.now()
    };

    Notification.create(notifications).then(function (result) {
        return res.send({

        });
    });
});

router.get('/getNotification', (req, res) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    Notification.find({userIdTarget: userData.userId}).then((result) => {
        console.log(result)
    }).catch((err) => {
        res.status(404).json({success: false, msg: `No such user.`});
    });
});

module.exports = router;
