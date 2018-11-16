import React, {Component} from "react";
import './Inbox_Chat_Component.css'

class Inbox_Chat_Component extends Component {
    constructor(){
        super();
        this.cekSiapaYangChat = this.cekSiapaYangChat.bind(this);
    }

    cekSiapaYangChat(userId){
        const chatData = this.props.chatData;
        const chatUserId = this.props.chatData.userId;
        const userLoginId = this.props.userChatData.userId;
        // Cek Chat userId nya, sama userLoginId
        if(chatUserId !== userLoginId){
            return(
              <div className="chat" key={chatData._id}>
                      <div id="receiverChatContainer">
                          {chatData.messageText}
                      </div>
              </div>
            )
        }
        else{
            return(
                <div className="chat" key={chatData._id}>
                        <div id="senderChatContainer">
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
