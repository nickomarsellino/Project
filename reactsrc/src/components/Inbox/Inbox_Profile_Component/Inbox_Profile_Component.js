import React, {Component} from "react";
import {List, Image} from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import {Icon} from 'semantic-ui-react'
import axios from 'axios';

import './Inbox_Profile_Component.css';
import openSocket from 'socket.io-client';

const socket = openSocket('http://10.183.28.153:8000');

class Inbox_Profile_Component extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: '',
            chatDetailMessage: [],
            messagesUnRead: 0
        };

        this.endChatMessage = this.endChatMessage.bind(this);
        this.getChatDetailMessage = this.getChatDetailMessage.bind(this)
        this.getChatDetailUnReadMessage = this.getChatDetailUnReadMessage.bind(this)
    }

    componentWillMount() {
        this.getChatDetailUnReadMessage(this.props.people._id)
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;
        if (imageUrl) {
            return (
                <img alt=" "
                     id="profileAvatar"
                     src={require(`../../../uploads/${imageUrl}`)}
                     className="float-right"
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profileAvatar"
                />
            );
        }
    }

    endChatMessage(roomMessagesId, userId, _id) {
        const pullChatData = {
            roomMessagesId: roomMessagesId,
        };
        axios({
            method: 'PUT',
            responseType: 'json',
            url: `http://localhost:3001/api/inbox/unSendMessage/` + _id,
            data: pullChatData
        })
        this.setState({
            chatDetailMessage: pullChatData
        })
    }

    getChatDetailMessage() {

        this.setState({
            chatDetailMessage: this.props.people
        });
        this.props.history.replace({
            pathname: '/home/inbox',
            state: {
                chatDetailMessage: this.props.people
            }
        })

        // Fungsi kirim ke parent inbox page
        this.props.sendTheMessageDetail(this.props.people)

        this.props.history.replace({
            pathname: '/home/inbox',
            state: {
                chatDetailMessage: this.props.people
            }
        })

        axios.get('/api/inbox/changeUnReadMessage/' + this.props.people._id)
            .then(res => {

            });
    }

    getChatDetailUnReadMessage(_id) {
        axios.get('/api/inbox/chatDetailMessage/' + _id)
            .then(res => {
                for(let i=0; i<res.data.messages.length; i++){
                    if(res.data.messages[i].userId !== localStorage.getItem("myThings")){
                        if(res.data.messages[i].messageIsRead === 'true'){

                        }
                        else{
                            this.setState({
                                messagesUnRead: this.state.messagesUnRead + 1
                            });
                        }
                    }
                }
            });
    }

    showUnReadMessages(){
        if(this.state.messagesUnRead > 0){
            return(
                <Icon
                    id="notificationChat"
                    circular inverted color='teal'
                    //onClick={() => this.endChatMessage(people.roomMessagesId, people.userId, people._id)}
                >
                    <p id="notificationChatCounter">{this.state.messagesUnRead}</p>
                </Icon>

            );
        }
    }

    render() {

        return (
            <List.Item id="listItemProfile">
                <Image avatar id="avatarItemContainer"
                       onClick={() => this.getChatDetailMessage()}
                >
                    {this.setProfileImage(this.props.people.profileReceiverPicture)}
                </Image>
                <List.Content id="contentItemContainer">
                    <List.Header id="profileNameBox"
                                 onClick={() => this.getChatDetailMessage()}>{this.props.people.userReceiverName}</List.Header>
                    {this.showUnReadMessages()}
                    <br/>
                </List.Content>
                <hr/>
            </List.Item>
        )
    }
}

export default Inbox_Profile_Component;
