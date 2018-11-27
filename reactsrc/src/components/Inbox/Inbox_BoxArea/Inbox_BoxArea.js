import React, {Component} from "react";
import {Form, TextArea} from 'semantic-ui-react'
import {Button} from "mdbreact"

import './Inbox_BoxArea.css'
import axios from "axios/index";
import openSocket from 'socket.io-client';

const socket = openSocket('http://10.183.28.153:8000');


class Inbox_BoxArea extends Component {

    constructor(props){
        super(props);
        this.state = {
            messageText: '',
            roomMessagesId: '',
            userId: this.props.chatMessageDetail.userId
        }
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            messageText: e.target.value
        });
    }

    sendTextMessage(){
        const messageData = {
            roomMessagesId: this.props.chatMessageDetail.roomMessagesId,
            userId: this.state.userId,
            messageText: this.state.messageText,
            messageTimestamp: new Date()
        };
        axios({
            method: 'PUT',
            url: `http://localhost:3001/api/inbox/sendMessage/` + this.props.chatMessageDetail.roomMessagesId,
            data: messageData
        })
        .then(res => {
            this.setState({
                messageText: ''
            })
            socket.emit("sendMessage", res.data)
        })
    }

    handleRef = (c) => {
        this.inputRef = c
    }

    render() {
        console.log( this.props.chatMessageDetail.roomMessagesId);
        return (
            <div id="inboxBoxContainer">
                <Form.Field
                    value= {this.state.messageText}
                    onChange={this.handleInputChange}
                    type="text"
                    id="inboxBox"
                    maxLength="100"
                    control={TextArea}
                    placeholder={"Say hi to " + this.props.chatMessageDetail.userReceiverName}
                    style={{maxHeight: "60px", minHeight: "50px", width: "836px"}}
                    ref={this.handleRef}
                />

                <Button color="default"
                        size="md"
                        type="submit"
                        id="inboxButton"
                        onClick={this.sendTextMessage}
                >Send</Button>
            </div>
        )
    }
}

export default Inbox_BoxArea;
