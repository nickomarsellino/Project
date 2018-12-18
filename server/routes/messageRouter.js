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
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    const inboxInformationData = {
        userId: req.body.userId,
        username: req.body.username,
        profilePicture: req.body.profilePicture,
        userReceiverId: req.body.userReceiverId,
        userReceiverName: req.body.userReceiverName,
        profileReceiverPicture: req.body.profileReceiverPicture,
        roomMessagesId: req.body.roomMessagesId,
        isReceiverOpenedChat: false
    };
    Message.create(inboxInformationData).then(function (result) {
        return res.send({
            _id: result._id,
            userId: result.userId,
            username: result.username,
            profilePicture: result.profilePicture,
            userReceiverId: result.userReceiverId,
            userReceiverName: result.userReceiverName,
            profileReceiverPicture: result.profileReceiverPicture,
            roomMessagesId: result.roomMessagesId
        });
    });
});

// id didapat ketika dia pencet inbox kebuat gitu
router.put('/sendMessage/:id', (req, res) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    if(String(req.body.isReceiverOpenedChat) === 'true'){
        Message.updateMany({roomMessagesId: req.params.id},
            {
                $push: {
                    messages: {
                        'userId': userData.userId,
                        'roomMessagesId': req.body.roomMessagesId,
                        'messageText': req.body.messageText,
                        'messageTimestamp': Date.now(),
                        'messageIsRead': true
                    }
                }
            }
            , {new: true}, function (err, user) {
                if (err) {
                    return res.send(err)
                }
                ;
                res.json({
                    userId: req.body.userId,
                    messageText: req.body.messageText,
                    roomMessagesId: req.body.roomMessagesId,
                    messageTimestamp: new Date()
                });
            });
    }
    else{
        Message.updateMany({roomMessagesId: req.params.id},
            {
                $push: {
                    messages: {
                        'userId': userData.userId,
                        'roomMessagesId': req.body.roomMessagesId,
                        'messageText': req.body.messageText,
                        'messageTimestamp': Date.now(),
                        'messageIsRead': false
                    }
                }
            }
            , {new: true}, function (err, user) {
                if (err) {
                    return res.send(err)
                }
                ;
                res.json({
                    userId: req.body.userId,
                    messageText: req.body.messageText,
                    roomMessagesId: req.body.roomMessagesId,
                    messageTimestamp: new Date()
                });
            });
    }

    Message.updateMany({roomMessagesId: req.params.id}, {
        $set: {roomMessageTimestamp: Date.now()}
    }).exec();
});

router.put('/unSendMessage/:id', (req, res) => {
    Message.findByIdAndUpdate({_id: req.params.id},
        {$pull: {messages: {roomMessagesId: req.body.roomMessagesId}}}, {new: true}, function (err, user) {
            if (err) {
                return res.send(err)
            }
            ;
            res.json(user);
        });
})

router.delete('/endChatMessage/:id', (req, res, next) => {
    Message.findByIdAndRemove({_id: req.params.id}).then((result) => {
        res.send(result);
    })
});

// Get isi chat nya, id ini diambil dari yang sudah terbuat di atas ketika post pas klik Inbox pada FE
router.get('/chatDetailMessage/:id', (req, res, next) => {
    Message.findById({_id: req.params.id}).then((result) => {
        res.send(result);
    })
})

// Get isi chat nya, id ini diambil dari yang sudah terbuat di atas ketika post pas klik Inbox pada FE
router.get('/isOpenMessage/:id', (req, res, next) => {

    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);


    Message.updateMany({userReceiverId: userData.userId}, {
        $set: {
            isReceiverOpenedChat: false
        }
    }).then((result) => {
        Message.updateMany({userId: req.params.id, userReceiverId: userData.userId}, {
            $set: {
                isReceiverOpenedChat: true
            }
        }).exec();
    });

})

router.get('/changeUnReadMessage/:id', (req, res, next) => {
    Message.findById({_id: req.params.id}).then((result) => {
        for(let i=0; i<result.messages.length; i++){

            let messages =[];

            if(String(result.userReceiverId) === String(result.messages[i].userId)){
                messages = result.messages[i]

                if(messages.messageIsRead.toString() === "false"){
                    console.log(messages.messageIsRead)

                    let query = 'messages.'+[i]+'.messageIsRead'
                    let condition = 'messages.'+[i]+'.userId'

                    Message.updateMany({_id: req.params.id, [condition]: result.userReceiverId}, {
                        $set: {
                            [query]: true
                        }
                    }).exec();
                }
            }
        }
    })
})


// Get detail namanya kayak lagi chat sama siapa
router.get('/listContactInbox', (req, res, next) => {
    const tokenId = atob(req.headers.cookie.replace('tokenId=', ''));
    const bytes = CryptoJS.AES.decrypt(tokenId.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(plaintext);

    Message.find({userId: userData.userId}).sort({roomMessageTimestamp: 'descending'}).then((result) => {
        res.send(result);
    });
});

module.exports = router;
