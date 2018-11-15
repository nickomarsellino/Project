import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import emptyChat from '../../../emptyChat.png'
import {Card, CardBody} from "mdbreact"
import {Icon} from 'semantic-ui-react'
import ReactDOM from 'react-dom';
import InboxProfile from '../Inbox_Profile_Container/Inbox_Profile_Container.js'
import InboxBoxArea from '../Inbox_BoxArea/Inbox_BoxArea.js'
import InboxChatContainer from '../Inbox_Chat_Container/Inbox_Chat_Container.js'

import './Inbox_Page.css';

class Inbox_Page extends Component {
    constructor(){
        super();
        this.state = {
            inboxPeopleList: '',
            chatMessageDetail: [],
            isChatOpened: false
        };
        this.sendTheMessageDetail = this.sendTheMessageDetail.bind(this);
    }

    // Function untuk terima data dari anaknya si inbox_profile_container
    sendTheMessageDetail(messagesData){
        this.setState({
            chatMessageDetail: messagesData,
            isChatOpened: true
        });
    }

    isChatOpened(){
        if(this.state.isChatOpened){
            return(
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
                )
        }
        else{
            return(
                <div id="isEmptyChat">
                    <p>Let's Chat With Your Friend's</p>
                    {/*<img src={emptyChat} alt=""/>*/}
                </div>
            )
        }
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
                                {this.isChatOpened()}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </FadeIn>
        )
    }
}

export default Inbox_Page;
