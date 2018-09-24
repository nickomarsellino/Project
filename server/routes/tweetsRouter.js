const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const UserSession = require('../models/User_Session');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const btoa = require('btoa');
const atob = require('atob');
const cookie = require('cookie');
const secretKey = 'Lil-Uzi-Vert=XO-Tour-LIF3'
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post('/posting', (req, res, next) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    const tweet = {
        username: req.body.username,
        tweetText: req.body.tweetText,
        userId: userData.userId,
        profilePicture: req.body.profilePicture,
        //tweetImage: req.file.path,
        checkLikes: false,
        timestamp: Date.now()
    };
    Tweet.create(tweet).then(function (result) {
        return res.send({
            success: true,
            userId: '',
            username: result.username,
            tweetText: result.tweetText,
            timestamp: new Date(),
            checkLikes: '',
            message: 'Tweet posted successfully..!',
        });
    });
});

router.delete('/tweet/:id', (req, res, next) => {
    Tweet.findByIdAndRemove({_id: req.params.id}).then((result) => {
        res.send(result);
    });
});

// get all tweets
router.get('/tweets', (req, res, next) => {
    // Tweet.find({ tweetText: /test/i }, 'username tweetText').sort({timestamp: 'descending'}).then((result) => {
    Tweet.find({}).sort({timestamp: 'ascending'}).then((result) => {
        res.send(result);
    });
});

// SEARCH FILTER BY TWEETS, get all tweets data, yang input nya sesuai dengan tweets nya
// https://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value
router.get('/searchByTweets/:tweetText', (req, res, next) => {
    const searchTweetsQuery = req.params.tweetText;
    Tweet.find({tweetText: new RegExp(searchTweetsQuery, "i")}, 'username tweetText timestamp userId profilePicture').then((result) => {
        res.send(result);
    });
});

// get one tweet only for modal, id nya Tweets id nya
router.get('/tweet/:id', (req, res) => {
    Tweet.findById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(404).json({success: false, msg: `No such tweets.`});
    });
});

// get tweet yang di post user nya aja, id si user
router.get('/profiletweet/:id', (req, res) => {
    Tweet.find({userId: req.params.id}).sort({timestamp: 'descending'}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(404).json({success: false, msg: `No such tweets.`});
    });
});

// Buat Like kasih id kita
router.put('/likeTweet/:id', (req,res) => {
    Tweet.findByIdAndUpdate( {_id: req.params.id}, {$push: {likes: req.body.userId}}, {new: true}, function (err, user) {
      if (err) {
        return res.send(err)
      };
      res.json(user);
    });
  })

router.put('/unlikeTweet/:id', (req,res) => {
    Tweet.findByIdAndUpdate( {_id: req.params.id}, {$pull: {likes: req.body.userId}}, {new: true}, function (err, user) {
      if (err) {
        return res.send(err)
      };
      res.json(user);
    });
  })

module.exports = router;
