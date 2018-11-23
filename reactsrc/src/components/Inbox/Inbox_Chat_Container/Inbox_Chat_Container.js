import React, {Component} from "react";
import { Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'mdbreact';
import './Inbox_Chat_Container.css'
import InboxChatComponent from '../Inbox_Chat_Component/Inbox_Chat_Component'
import openSocket from 'socket.io-client';

const socket = openSocket('http://10.183.28.153:8000');

class Inbox_Chat_Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatMessageDetail: [],
            roomMessagesId: this.props.chatMessageDetail.roomMessagesId,
            dropdownOpen: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    // Pertama render iniiii
    componentWillMount() {
        this.setState({
            chatMessageDetail: this.props.chatMessageDetail.messages
        })

        socket.on(this.state.roomMessagesId + 'getMessage', bebasnamavariabel => {
            const allInboxMessage = this.state.chatMessageDetail;
            const newMessage = [bebasnamavariabel];
            this.setState({
                chatMessageDetail: (allInboxMessage.concat(newMessage))
            });
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            chatMessageDetail: props.chatMessageDetail.messages
        });
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;
        if (imageUrl) {
            return (
                <img alt=" "
                     src={require(`../../../uploads/${imageUrl}`)}
                     className="float-right"
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                />
            );
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div className="inboxChatContainer">
                <div id="avatarProfileUserContainer">
                    <Image avatar id="avatarProfileUser">
                        {this.setProfileImage(this.props.chatMessageDetail.profileReceiverPicture)}
                    </Image>
                    <span>
                        <p>{this.props.chatMessageDetail.userReceiverName}</p>
                    </span>

                    <Dropdown className="navProfile" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav={true} caret={true} id="caretColor"/>
                        <DropdownMenu id="navProfileContainer">
                            <DropdownItem>
                                   Clear Chat History
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
