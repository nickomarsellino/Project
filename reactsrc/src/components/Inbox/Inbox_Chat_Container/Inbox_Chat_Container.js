import React, {Component} from "react";
import { Image } from 'semantic-ui-react'

import './Inbox_Chat_Container.css'

class Inbox_Chat_Container extends Component {


    render() {
        return (
            <div className="inboxChatContainer">
                <div id="avatarProfileUserContainer">
                    <Image avatar id="avatarProfileUser">
                        <img src="https://react.semantic-ui.com/images/avatar/small/helen.jpg" alt=""/>
                    </Image>
                    <span><p>Rachel</p></span>
                </div>
            </div>
        )
    }
}

export default Inbox_Chat_Container;
