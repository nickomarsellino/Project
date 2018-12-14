const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const UserSession = require('../models/User_Session');
const Tweet = require('../models/Tweet');
const Message = require('../models/Message.js');
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
        cb(null, '../reactsrc/src/uploads');
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

// Edit Profile
router.put('/editProfile', (req, res) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    console.log(req.body);

    User.findByIdAndUpdate({_id: userData.userId}, req.body).then(() => {
        User.findOne({_id: userData.userId}).then((user) => {
            user.save()
                .then((result) => {
                    //Update data di Tweet
                    Tweet.updateMany({userId: userData.userId}, {$set: {username: req.body.username}}).exec();

                    //Update Data di Message
                    Message.updateMany({userId: userData.userId}, {$set: {username: req.body.username}}).exec();
                    Message.updateMany({userReceiverId: userData.userId}, {$set: {userReceiverName: req.body.username}}).exec();


                    //Update Data di Comments
                    Tweet.find({'comments.userId': userData.userId}).then((result) => {

                        for (var i = 0; i < result.length; ++i) {
                            for (var j = 0; j < result[i].comments.length; j++){
                                let comments = []
                                let userId = userData.userId

                                comments = result[i].comments[j]

                                if(comments.userId == userId){
                                    let query = 'comments.'+[j]+'.username'
                                    let condition = 'comments'+'.userId'

                                    Tweet.updateMany({[condition]: userData.userId}, {
                                        $set: {
                                            [query]: req.body.username
                                        }
                                    }).exec();
                                }
                            }
                        }
                    });

                    res.json({
                        success: true,
                        msg: `Successfully edited..!`,
                        result: {
                            _id: result._id,
                            username: result.username,
                            email: result.email,
                            password: result.password,
                            phone: result.phone
                        }
                    });
                }).catch((err) => {
                res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
                return;
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
                if (err.errors.phone) {
                    res.status(403).json({success: false, msg: err.errors.phone.message});
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(403).json({success: false, msg: `Something went wrong. ${err}`});
            }
        });
    });


    // User.findById(userData.userId).then((userData) => {
    //
    //     console.log(userData.username);
    //
    //     User.find({username: req.body.username}).then((result) => {
    //         if(result[0].username === userData.username){
    //             User.findByIdAndUpdate({_id: userData.userId}, req.body).then(() => {
    //                 User.findOne({_id: userData.userId}).then((user) => {
    //                     user.save()
    //                         .then((result) => {
    //                             Tweet.updateMany({userId: userData.userId}, {$set: {username: req.body.username}}).exec();
    //                             res.json({
    //                                 success: true,
    //                                 msg: `Successfully edited..!`,
    //                                 result: {
    //                                     _id: result._id,
    //                                     username: result.username,
    //                                     email: result.email,
    //                                     password: result.password,
    //                                     phone: result.phone
    //                                 }
    //                             });
    //                         }).catch((err) => {
    //                         res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
    //                         return;
    //                     });
    //                 }).catch((err) => {
    //                     if (err.errors) {
    //                         if (err.errors.username) {
    //                             res.status(403).json({success: false, msg: err.errors.username.message});
    //                             return;
    //                         }
    //                         if (err.errors.email) {
    //                             res.status(403).json({success: false, msg: err.errors.email.message});
    //                             return;
    //                         }
    //                         if (err.errors.phone) {
    //                             res.status(403).json({success: false, msg: err.errors.phone.message});
    //                             return;
    //                         }
    //                         // Show failed if all else fails for some reasons
    //                         res.status(403).json({success: false, msg: `Something went wrong. ${err}`});
    //                     }
    //                 });
    //             });
    //         }
    //
    //         else{
    //             User.findByIdAndUpdate({_id: userData.userId}, req.body).then(() => {
    //                 User.findOne({_id: userData.userId}).then((user) => {
    //                     user.save()
    //                         .then((result) => {
    //                             Tweet.updateMany({userId: userData.userId}, {$set: {username: req.body.username}}).exec();
    //                             res.json({
    //                                 success: true,
    //                                 msg: `Successfully edited..!`,
    //                                 result: {
    //                                     _id: result._id,
    //                                     username: result.username,
    //                                     email: result.email,
    //                                     password: result.password,
    //                                     phone: result.phone
    //                                 }
    //                             });
    //                         }).catch((err) => {
    //                         res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
    //                         return;
    //                     });
    //                 }).catch((err) => {
    //                     if (err.errors) {
    //                         if (err.errors.username) {
    //                             res.status(403).json({success: false, msg: err.errors.username.message});
    //                             return;
    //                         }
    //                         if (err.errors.email) {
    //                             res.status(403).json({success: false, msg: err.errors.email.message});
    //                             return;
    //                         }
    //                         if (err.errors.phone) {
    //                             res.status(403).json({success: false, msg: err.errors.phone.message});
    //                             return;
    //                         }
    //                         // Show failed if all else fails for some reasons
    //                         res.status(403).json({success: false, msg: `Something went wrong. ${err}`});
    //                     }
    //                 });
    //             });
    //         }
    //     });
    // });
});

// Edit Profile PICTURE
router.put('/editProfilePicture/:id', upload.single('profilePicture'), (req, res) => {

    jimp.read(req.file.path, function (err, image) {
        if (err) {
            console.log("Gagal cuuu!");
        }
        else {
            image
                .quality(30)
                .write('../reactsrc/src/uploads/' + req.file.filename);
            console.log("Berhasil!");
        }
    });


    User.find({_id: req.params.id}, 'profilePicture').then((result) => {
            fs.unlink('../reactsrc/src/uploads/'+result[0].profilePicture, function(error) {
                if (error) {
                    throw error;
                }
            });
    });

    User.updateMany({_id: req.params.id}, {$set: {profilePicture: req.file.filename}}).exec();
    Tweet.updateMany({userId: req.params.id}, {
        $set: {
            profilePicture: req.file.filename
        }
        }).exec();

    //Update Data di Message
    Message.updateMany({userId: req.params.id}, {$set: {profilePicture: req.file.filename}}).exec();
    Message.updateMany({userReceiverId: req.params.id}, {$set: {profileReceiverPicture: req.file.filename}}).exec();



    Tweet.find({'comments.userId': req.params.id}).then((result) => {
        for (var i = 0; i < result.length; ++i) {
            for (var j = 0; j < result[i].comments.length; j++){
                let comments = []
                let userId = req.params.id

                comments = result[i].comments[j]

                if(comments.userId == userId){
                    console.log("H4SIL:",userId);

                    let query = 'comments.'+[j]+'.profilePicture'
                    let condition = 'comments.'+[j]+'.userId'

                    Tweet.updateMany({[condition]: req.params.id}, {
                        $set: {
                            [query]: req.file.filename
                        }
                    }).exec();
                }
            }
        }
    });


    // Tweet.updateMany({'comments.userId': req.params.id}, {
    //     $set: {
    //         'comments.$.profilePicture': req.file.filename
    //     }
    // }).exec();

});


router.post('/following/:id', function(req, res, next) {
    User.findOne({ _id: req.body.username }, function(err, user) {

    user.followers.push(req.user._id);
    var followedUser = user._id;
    user.save(function(err){
        if(err){
            //Handle error
            //send error response
        }
        else
        {
            // Secondly, find the user account for the logged in user
            User.findOne({ username: req.user.username }, function(err, user) {

                user.following.push(followedUser);
                user.save(function(err){
                    if(err){
                        //Handle error
                        //send error response
                    }
                    else{
                        //send success response
                    }
                });
            });
        }
    });
  });
});


router.put('/changePassword/:id', (req, res) => {
    const user = new User();
    // Dari inputan
    const currentPassword = req.body.currentPassword;

    User.findById(req.params.id).then((result) => {
        // Cek current sama di db sama gak
        if (bcrypt.compareSync(currentPassword, result.password)) {
            // ganti newpassword
            User.updateMany({_id: req.params.id}, {$set: {password: user.generateHash(req.body.newPassword)}}).exec();

            res.send({success: true, msg: 'Password has been changed...!'});

        }
        else {
            res.status(404).json({success: false, msg: 'Invalid Password...!'});
        }
    })
});

// SEARCH FILTER BY USER, get all of the username yang mengandung kata yang di input
router.get('/searchByUser/:username', (req, res, next) => {
    const searchUserQuery = req.params.username;
    console.log("searchUserQuery: ", searchUserQuery);
    // User.findOne({username: new RegExp('^'+searchUserQuery+'$', "i")}, 'username profilePicture').then((result) => {
    User.find({username: new RegExp(searchUserQuery, "i")}, 'username profilePicture').then((result) => {
        res.send(result);
    });
});

// Get data for update profile & to View User Data
router.get('/', (req, res) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));

    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    User.findById(userData.userId).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(404).json({success: false, msg: `No such user.`});
    });
});


router.get('/allUsers', (req, res, next) => {
    User.find({}).sort({timestamp: 'descending'}).then((result) => {
        res.send(result);
    });
});

// Get data for profile page
router.get('/profile/:id', (req, res) => {
    User.find({_id: req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(404).json({success: false, msg: `No such user.`});
    });
});

router.put('/follow/:id', (req,res) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);
    User.findByIdAndUpdate( {_id: req.params.id},
        {$push:
            {followers: userData.userId}
        }, {new: true}, function (err, user) {
        if (err) {
            return res.send(err)
        };
        res.json(user);
    });
    User.updateMany({_id: userData.userId},
        {$push: {following: req.params.id}}
    ).exec();
})

router.put('/unfollow/:id', (req,res) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    User.findByIdAndUpdate( {_id: req.params.id},
        {$pull:
            {followers: userData.userId}
        }, {new: true}, function (err, user) {
        if (err) {
            return res.send(err)
        };
        res.json(user);
    });
    User.updateMany({_id: userData.userId},
        {$pull: {following: req.params.id}}
    ).exec();
})


router.get('/followingData/:id', (req,res) => {
    User.findById({ _id : req.params.id}).then((result) => {
        res.json({result});
    });
})

router.get('/followersData/:id', (req,res) => {
    User.findById({ _id : req.params.id}).then((result) => {
        res.json(result);
    });
})

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

module.exports = router;
