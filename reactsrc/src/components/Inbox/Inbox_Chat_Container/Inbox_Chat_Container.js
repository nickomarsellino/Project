import React, {Component} from "react";
import { Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';

import './Inbox_Chat_Container.css'
import InboxChatComponent from '../Inbox_Chat_Component/Inbox_Chat_Component'


class Inbox_Chat_Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatMessageDetail: []
        };
    }

    componentDidMount() {
        this.setState({
            chatMessageDetail: this.props.chatMessageDetail.messages
        })
    }


    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;
        if (imageUrl) {
            return (
                <img alt=" "
                     id="profileImage"
                     src={require(`../../../uploads/${imageUrl}`)}
                     className="float-right"
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profileImage"
                />
            );
        }
    }

    render() {
        console.log(this.state.chatMessageDetail);
        return (
            <div className="inboxChatContainer">
                <div id="avatarProfileUserContainer">
                    <Image avatar id="avatarProfileUser">
                        {this.setProfileImage(this.props.chatMessageDetail.profileReceiverPicture)}
                    </Image>
                    <span>
                        <p>{this.props.chatMessageDetail.userReceiverName}</p>
                    </span>
                </div>
                <div id="chatContainer">
                    {this.state.chatMessageDetail.map(chatData =>
                        <InboxChatComponent
                        chatData={chatData}
                        userChatData={this.props.chatMessageDetail}
                        >
                        </InboxChatComponent>
                    )}
                </div>
            </div>
        )
    }
}

export default Inbox_Chat_Container;
