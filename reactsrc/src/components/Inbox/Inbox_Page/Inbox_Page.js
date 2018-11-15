import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Card, CardBody} from "mdbreact"
import {Icon} from 'semantic-ui-react'
import axios from 'axios';

import InboxProfile from '../Inbox_Profile_Container/Inbox_Profile_Container.js'
import InboxBoxArea from '../Inbox_BoxArea/Inbox_BoxArea.js'
import InboxChatContainer from '../Inbox_Chat_Container/Inbox_Chat_Container.js'

import './Inbox_Page.css';

class Inbox_Page extends Component {
    constructor(){
        super();
        this.state = {
            inboxPeopleList: '',
            chatMessageDetail: []
        };
        this.sendTheMessageDetail = this.sendTheMessageDetail.bind(this);
    }

    // Function untuk terima data dari anaknya si inbox_profile_container
    sendTheMessageDetail(messagesData){
        this.setState({
            chatMessageDetail: messagesData
        });
    }

    render() {
        return (
            <FadeIn id="InboxPage">
                <Card className="inboxCard">
                    <CardBody>
                        <div className="inboxCardContainer">
                            <div id="inboxCardContainerRight">
                                <div id="headerContainerInbox">
                                    <Icon name='envelope open outline'
                                          size='big'
                                          id="headerIcon"
                                    />
                                    <p id="headerText">Your Inbox</p>
                                </div>

                                <div id="inboxProfileContainer">
                                    <InboxProfile
                                    sendTheMessageDetail={this.sendTheMessageDetail}
                                    userLoginId={this.props.userId}
                                    />
                                </div>
                            </div>

                            <div id="inboxCardContainerLeft">
                                <div id="inboxMessageContainer">
                                    <div id="inboxChatContainer">
                                        <InboxChatContainer
                                        chatMessageDetail={this.state.chatMessageDetail}
                                        />
                                    </div>

                                    <div id="inboxBoxAreaContainer">
                                        <InboxBoxArea
                                        chatMessageDetail={this.state.chatMessageDetail}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </FadeIn>
        )
    }
}

export default Inbox_Page;
