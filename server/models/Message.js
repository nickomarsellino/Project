const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    userId: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    username:{
      type: String
    },
    profilePicture:{
      type: String
    },
    userReceiverId:{
      type: Schema.ObjectId,
      ref: 'User'
    },
    userReceiverName:{
      type: String
    },
    profileReceiverPicture:{
      type: String
    },
    roomMessagesId:{
      type: String
    },
    messages:[{
      userId:{
        type: Schema.ObjectId,
        ref: 'User'
      },
      messageText:{
        type: String
      },
      roomMessagesId:{
          type: String
      },
      messageTimestamp:{
        type: Date,
        default: Date.now()
      }
    }]
});

MessageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Message', MessageSchema)
