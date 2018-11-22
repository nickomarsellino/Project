import React, {Component} from "react";
import './Inbox_Chat_Component.css'

const Timestamp = require('react-timestamp');

class Inbox_Chat_Component extends Component {
    constructor(){
        super();
        this.cekSiapaYangChat = this.cekSiapaYangChat.bind(this);
    }

    cekSiapaYangChat(userId){
        const chatData = this.props.chatData;
        const chatUserId = this.props.chatData.userId;
        const userLoginId = this.props.userChatData.userId;
        if(chatUserId !== userLoginId){
            return(
              <div className="chat" key={chatData._id}>
                      <div id="receiverChatContainer">
                          {chatData.messageText} <br/>
                          <div id="timeChatReceiver">
                              <Timestamp time={chatData.messageTimestamp} format="time" />
                          </div>
                      </div>
              </div>
            )
        }
        else{
            return(
                <div className="chat" key={chatData._id}>
                        <div id="senderChatContainer">
                            <div id="timeChatSender">
                                <Timestamp time={chatData.messageTimestamp} format="time" />
                            </div>
                            {chatData.messageText}
                        </div>
                </div>
            )
        }
    }

    render() {
        return (
          <div className="chat" >
            {this.cekSiapaYangChat()}
          </div>
        )
    }
}

export default Inbox_Chat_Component;
