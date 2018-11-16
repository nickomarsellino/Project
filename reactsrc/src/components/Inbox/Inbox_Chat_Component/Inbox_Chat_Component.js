import React, {Component} from "react";
import './Inbox_Chat_Component.css'

class Inbox_Chat_Component extends Component {

    render() {
        const chatData = this.props.chatData;
        return (
            <div className="chat" key={chatData._id}>
                <div id="receiverChatContainer">
                    {chatData.messageText}
                </div>

                <div id="senderChatContainer">
                </div>
            </div>

        )
    }
}

export default Inbox_Chat_Component;
