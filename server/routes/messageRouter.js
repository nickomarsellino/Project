const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const btoa = require('btoa');
const atob = require('atob');
const cookie = require('cookie');
const secretKey = 'Lil-Uzi-Vert=XO-Tour-LIF3'
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/message', (req, res, next) => {
    const data = {
        userId: req.body.userId,
        username: req.body.username,
        profilePicture: req.body.profilePicture,
        userReceiverId: req.body.userReceiverId,
        userReceiverName: req.body.userReceiverName,
        profileReceiverPicture: req.body.profileReceiverPicture
    };
    Message.create(data).then(function (result) {
        return res.send({
            _id : result._id,
            userId: result.userId,
            username: result.username,
            profilePicture: result.profilePicture,
            userReceiverId: result.userReceiverId,
            userReceiverName: result.userReceiverName,
            profileReceiverPicture: result.profileReceiverPicture
        });
    });
    console.log(data);
});

// id didapat ketika dia pencet inbox kebuat gitu
router.put('/sendMessage/:id', (req, res) => {
    Message.findByIdAndUpdate({_id: req.params.id},
        {$push: {
            messages:{
              'userId' : req.body.userId,
              'messageText' : req.body.messageText,
              'messageTimestamp': Date.now()
            }
        }}, {new: true}, function (err, user) {
        if (err) {
          return res.send(err)
        };
        let temp = user.messages.length - 1
        res.json({
          _id : user.messages[temp]._id,
          userId: req.body.userId,
          messageText: req.body.messageText,
          messageTimestamp: new Date()
        });
    });
});

router.put('/unSendMessage/:id', (req,res) => {
    // const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    // const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // const userData = JSON.parse(plaintext);

    Message.findByIdAndUpdate( {_id: req.params.id},
      {$pull: {messages:  { _id: req.body._id, userId: req.body.userId} }}, {new: true}, function (err, user) {
      if (err) {
        return res.send(err)
      };
      res.json(user);
    });
})

router.delete('/endChatMessage/:id', (req, res, next) => {
    Message.findByIdAndRemove({_id: req.params.id }).then((reuslt) => {
        res.send(result);
    })
});

// Get isi chat nya, id ini diambil dari yang sudah terbuat di atas ketika post pas klik Inbox pada FE
router.get('/chatDetailMessage/:id', (req, res, next) => {
    Message.findById({_id: req.params.id}).then((result) => {
        res.send(result);
    })
})

// Get detail namanya kayak lagi chat sama siapa
router.get('/listContactInbox', (req, res, next) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    Message.find({userId: userData.userId}).then((result) => {
        res.send(result);
    });
});

module.exports = router;
