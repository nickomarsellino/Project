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
        checkLikes: false,
        tweetPicture: '',
        timestamp: Date.now()
    };
    Tweet.create(tweet).then(function (result) {
        return res.send({
            _id : result._id,
            success: true,
            userId: result.userId,
            username: result.username,
            tweetText: result.tweetText,
            timestamp: new Date(),
            checkLikes: result.checkLikes,
            likes:result.likes,
            comments: result.comments,
            profilePicture: result.profilePicture
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
        Tweet.findById(req.params.id).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(404).json({success: false, msg: `No such tweets.`});
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

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    User.find({_id: userData.userId}).then((result) => {

        const query = Tweet.find({userId: { $in : result[0].following.concat(userData.userId) }}).sort(
            {timestamp: 'descending'}
        );
        const { page, perPage } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10),
        };

        Tweet.paginate(query, options).then(function(result) {
            res.send(result);
        });


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
});


// SEARCH FILTER BY TWEETS, get all tweets data, yang input nya sesuai dengan tweets nya
// https://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value
router.get('/searchByTweets/:tweetText', (req, res, next) => {
    const searchTweetsQuery = req.params.tweetText;

    const query = Tweet.find({tweetText: new RegExp(searchTweetsQuery, "i")}).sort({timestamp: 'descending'});
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

router.put('/commentTweet/:id', (req,res) => {
    Tweet.findByIdAndUpdate( {_id: req.params.id},
        {$push: {
            comments: {
              'userId': req.body.userId,
              'username': req.body.username,
              'commentText': req.body.commentText,
              'profilePicture': req.body.profilePicture,
              'commentTimestamp': Date.now()
            }
        }}, {new: true}, function (err, user) {
        if (err) {
          return res.send(err)
        };
        let temp = user.comments.length - 1
        res.json({
          // Supaya ke kirim _idnya
          _id : user.comments[temp]._id,
          userId: req.body.userId,
          username: req.body.username,
          commentText: req.body.commentText,
          profilePicture: req.body.profilePicture,
          commentTimestamp: new Date(),
          tweetId: req.body.tweetId
        });
      });
})

router.put('/deleteCommentTweet/:id', (req,res) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    Tweet.findByIdAndUpdate( {_id: req.params.id},
      {$pull: {comments:  { _id: req.body._id, userId: userData.userId} }}, {new: true}, function (err, user) {
      if (err) {
        return res.send(err)
      };
      res.json(user);
    });
})

router.get('/getComment/:id', (req,res) => {
    Tweet.findById({ _id : req.params.id})
    .then((result) => {
        res.send(result);
    })
})

module.exports = router;
