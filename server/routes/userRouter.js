const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const UserSession = require('../models/User_Session');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcrypt');

router.post('/tweet/:id', (req, res, next) => {

  const tweet = {
    username: req.body.username,
    tweetText: req.body.tweetText,
    userId: req.body.userId,
    timestamp: Date.now()
  };

    Tweet.create(tweet).then(function (result) {
        return res.send({
            success: true,
            userId: '',
            username: result.username,
            tweetText: result.tweetText,
            timestamp: new Date(),
            message: 'Tweet posted successfully..!',
        });
    });
  });

router.delete('/tweet/:id', (req, res, next) => {
  console.log(req.params.id);
  Tweet.findByIdAndRemove({_id: req.params.id}).then((result) => {
    res.send(result);
  });
});

router.get('/tweets', (req, res, next) => {
    Tweet.find({}).sort({timestamp: 'descending'}).then((result) => {
        res.send(result);
    });
});

router.get('/tweet/:id', (req, res) => {
  Tweet.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(404).json({success: false, msg: `No such tweets.`});
  });
});


router.post('/register', (req, res) => {

  const user = new User();
  // Data inputan dari FE
  const users = {
    username: req.body.username,
    email: req.body.email,
    password: user.generateHash(req.body.password),
    phone: req.body.phone
  };
  User.create(users).then(function(result) {
    res.send({
      success: true,
      msg: `Successfully added!`,
      result: {
        _id: result._id,
        username: result.username,
        email: result.email,
        password: result.password,
        phone: result.phone
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
    userSession.timestamp = Date.now();
    userSession.save((err, doc) => {
      if (err) {
        res.status(403).json({success: false, msg: 'Server Eror'});
        return;
      }
      return res.send({success: true, message: 'Valid sign in', token: doc._id, userId: user._id});
    });
  });
});

router.get('/logout', (req, res, next) => {
  // Get the token
  const {query} = req;
  const {token} = query;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted: true
    }
  }, null, (err, sessions) => {
    if (err) {
      res.status(403).json({success: false, msg: 'Server Eror'});
      return;
    }
    return res.send({success: true, message: token});
  });
});

// Edit Profile
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        User.findOne({_id: req.params.id}).then((user) => {
            user.save()
                .then((result) => {
                    Tweet.updateMany({userId: req.params.id}, {$set: {username: req.body.username}}).exec();
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
});

router.put('/changePassword/:id', (req, res) => {
    const user = new User();
    // Dari inputan
    const inputCurrentPassword = req.body.inputCurrentPassword;

    User.findById(req.params.id).then((result) => {
        // Cek current sama di db sama gak
        if (bcrypt.compareSync(inputCurrentPassword, result.password)) {

            // ganti newpassword
            User.updateMany({_id: req.params.id}, {$set: {password: user.generateHash(req.body.newPassword)}}).exec();

            res.send({
                success: true,
                msg: `Successfully added!`,
            });
        }
        else {
            res.status(404).json({success: false, msg: 'Wrong Password...!'});
        }
    })
});

// Get data for update profile
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(404).json({success: false, msg: `No such user.`});
  });
});

router.get('/verify', (req, res, next) => {
  // Get the token
  const {query} = req;
  const {token} = query;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({success: false, message: 'Error: Server error'});
    }
    if (sessions.length != 1) {
      return res.send({success: false, message: 'Error: Invalid'});
    } else {
      res.status(403).json({success: true, msg: 'CEK MASIH LOGIN '});
      return;
    }
  });
});
module.exports = router;
