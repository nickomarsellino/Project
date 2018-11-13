import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Card, CardBody} from "mdbreact"
import {Icon} from 'semantic-ui-react'

import InboxProfile from '../Inbox_Profile_Container/Inbox_Profile_Container'
import InboxBoxArea from '../Inbox_BoxArea/Inbox_BoxArea'
import InboxChat from '../Inbox_Chat_Container/Inbox_Chat_Container'

import './Inbox_Page.css';

class Inbox_Page extends Component {
    render() {
        return (
            <FadeIn id="InboxPage">
                <Card className="inboxCard">
                    <CardBody>
                        <div id="inboxCardContainer">
                            <div id="headerContainerInbox">
                                <Icon name='envelope open outline'
                                      size='big'
                                      id="headerIcon"
                                />
                                <p id="headerText">Your Inbox</p>
                            </div>

                            <div id="inboxProfileContainer">
                                <InboxProfile/>
                            </div>

                            <div id="inboxMessageContainer">
                                <div id="inboxChatContainer">
                                    <InboxChat/>
                                </div>

                                <div id="inboxBoxAreaContainer">
                                    <InboxBoxArea/>
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
