import React, {Component} from "react";
import {Form, TextArea} from 'semantic-ui-react'
import {Button} from "mdbreact"

import './Inbox_BoxArea.css'
import axios from "axios/index";

class Inbox_BoxArea extends Component {

    constructor(props){
        super(props);
        this.state = {
            messageText: ''
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
        })
    }

    render() {
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
