import React, {Component} from "react";
import { Icon } from 'semantic-ui-react'
import './Inbox_Chat_Component.css'

class Inbox_Chat_Component extends Component {

    render() {
        return (
            <div className="chat">

                <div id="receiverChatContainer">
                    Hai Chris :)
                </div>

                <div id="senderChatContainer">
                    Hai Rachel
                </div>
                <div id="senderChatContainer">
                    How was your Weekend ?
                </div>

                <div id="receiverChatContainer">
                    Everything Good, Hbu ?
                    Everything Great
                </div>

                <div id="senderChatContainer">
                   Btw, I miss you
                </div>

                <div id="receiverChatContainer">
                    YAP, i miss you too
                </div>

                <div id="senderChatContainer">
                    Can we make a call ?
                </div>
                <div id="senderChatContainer">
                    I miss your voice Hahaha
                </div>

                <div id="receiverChatContainer">
                    OkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkayOkay
                </div>
            </div>

        )
    }
}

export default Inbox_Chat_Component;
