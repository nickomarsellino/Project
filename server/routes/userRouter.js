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

const multer = require('multer');
const jimp = require('jimp') // buat image processing

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../reactsrc/src/uploads');
    },
    filename: function(req, file, cb) {
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
router.put('/:id', upload.single('profilePicture'), (req, res) => {

      jimp.read(req.file.path , function(err, image){
          if(err){
              console.log("Gagal cuuu!");
          }
          else{
              image
              .quality(45)
              .write('../reactsrc/src/uploads/' + req.file.filename);
              console.log("Berhasil!");
          }
      })

      console.log("originalname: ",req.file.originalname);
      console.log("path: ",req.file.path);
      console.log("filename: ",req.file.filename);

    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        User.findOne({_id: req.params.id}).then((user) => {
            user.save()
                .then((result) => {
                    User.updateMany({_id: req.params.id}, {$set: {profilePicture: req.file.filename}}).exec();
                    Tweet.updateMany({userId: req.params.id}, {$set: {username: req.body.username, profilePicture: req.file.filename} }).exec();
                    res.json({
                        success: true,
                        msg: `Successfully edited..!`,
                        result: {
                            _id: result._id,
                            username: result.username,
                            email: result.email,
                            phone: result.phone,
                            profilePicture: req.file.filename
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
    User.find({username: new RegExp(searchUserQuery, "i")}, 'username profilePicture').then((result)=> {
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


module.exports = router;
