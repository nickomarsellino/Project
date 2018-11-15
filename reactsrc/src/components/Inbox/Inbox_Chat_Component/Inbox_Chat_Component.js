import React, {Component} from "react";
import { Icon } from 'semantic-ui-react'
import './Inbox_Chat_Component.css'

class Inbox_Chat_Component extends Component {

    render() {
        return (
            <div className="chat">


                <div id="receiverChatContainer">
                    Hai
                    <div id="timeChatReceiver">
                        19.45 PM
                    </div>
                </div>

                <div id="senderChatContainer">
                    <div id="timeChatSender">
                        19.45 PM
                    </div>
                    Hai Rachel
                </div>
                <div id="senderChatContainer">
                    <div id="timeChatSender">
                        19.45 PM
                    </div>
                    How was your Weekend ?
                </div>

                <div id="receiverChatContainer">
                    Everything Good, Hbu ?
                    <div id="timeChatReceiver">
                        19.45 PM
                    </div>
                </div>

                <div id="senderChatContainer">
                    <div id="timeChatSender">
                        19.45 PM
                    </div>
                   Btw, I miss you
                </div>

                <div id="receiverChatContainer">
                    YAP, i miss you too
                    <div id="timeChatReceiver">
                        19.45 PM
                    </div>
                </div>

                <div id="senderChatContainer">
                    <div id="timeChatSender">
                        19.45 PM
                    </div>
                    Can we make a call ?
                </div>
                <div id="senderChatContainer">
                    <div id="timeChatSender">
                        19.45 PM
                    </div>
                    I miss your voice Hahaha
                </div>

                <div id="receiverChatContainer">
                    OkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkay
                    <div id="timeChatReceiver">
                        19.45 PM
                    </div>
                </div>
            </div>

        )
    }
}

export default Inbox_Chat_Component;
