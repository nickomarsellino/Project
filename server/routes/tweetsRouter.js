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
const fs = require('fs');

router.use(cookieParser());


const multer = require('multer');
const jimp = require('jimp') // buat image processing

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../reactsrc/src/tweetImage');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
        // cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
        // max: 10 mb
    },
    fileFilter: fileFilter
});

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
        tweetPicture: '',
        timestamp: Date.now()
    };
    Tweet.create(tweet).then(function (result) {
        return res.send({
            _id : result._id,
            success: true,
            userId: '',
            username: result.username,
            tweetText: result.tweetText,
            timestamp: new Date(),
            message: 'Tweet posted successfully..!',
        });
    });
});


router.put('/postingImage/:id', upload.single('tweetPicture'), (req, res) => {

    jimp.read(req.file.path, function (err, image) {
        if (err) {
            console.log("Gagal cuuu!");
        }
        else {
            image
                .quality(40)
                .write('../reactsrc/src/tweetImage/' + req.file.filename);
            console.log("Berhasil!");
        }
    });

    Tweet.updateMany({_id: req.params.id}, {
        $set: {tweetPicture: req.file.filename}
    }).exec();

    if (req.file.filename){
        res.send({
            tweetPicture : req.file.filename
        });
    }
});



router.delete('/tweet/:id', (req, res, next) => {

    Tweet.find({_id: req.params.id}, 'tweetPicture').then((result) => {
        if(result[0].tweetPicture.length === 0){
            Tweet.findByIdAndRemove({_id: req.params.id}).then((result) => {
                res.send(result);
            });
        }
        else{
            fs.unlink('../reactsrc/src/tweetImage/'+result[0].tweetPicture, function(error) {
                if (error) {
                    throw error;
                }
            });

            Tweet.findByIdAndRemove({_id: req.params.id}).then((result) => {
                res.send(result);
            });
        }
    });
});

// get all tweets
router.get('/tweets', (req, res, next) => {
    const query = Tweet.find({}).sort({timestamp: 'descending'});
    const { page, perPage } = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
    };

    Tweet.paginate(query, options).then(function(result) {
        res.send(result);
    });
});

// get tweet yang di post user nya aja, id si user
router.get('/profiletweet/:id', (req, res) => {

    const query = Tweet.find({userId: req.params.id}).sort({timestamp: 'descending'});
    const {page, perPage} = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
    };

    Tweet.paginate(query, options).then(function(result) {
         res.send(result);
    });

    // Tweet.find({userId: req.params.id}).sort({timestamp: 'descending'}).then((result) => {
    //     res.json(result);
    // }).catch((err) => {
    //     res.status(404).json({success: false, msg: `No such tweets.`});
    // });
});


// SEARCH FILTER BY TWEETS, get all tweets data, yang input nya sesuai dengan tweets nya
// https://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value
router.get('/searchByTweets/:tweetText', (req, res, next) => {
    const searchTweetsQuery = req.params.tweetText;

    const query = Tweet.find({tweetText: new RegExp(searchTweetsQuery, "i")}, 'username tweetText timestamp userId' +
        ' profilePicture tweetPicture').sort({timestamp: 'descending'});
    const { page, perPage } = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
    };

    Tweet.paginate(query, options).then(function(result) {
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



module.exports = router;
