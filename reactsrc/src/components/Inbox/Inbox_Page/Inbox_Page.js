import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Card, CardBody} from "mdbreact"

import InboxProfile from '../Inbox_Profile_Container/Inbox_Profile_Container'

import './Inbox_Page.css';

class Inbox_Page extends Component {
    render() {
        return (
            <FadeIn id="InboxPage">
                    <Card className="inboxCard" id="inboxCardId">
                        <CardBody>
                            <div id="inboxProfileContainer">
                                <InboxProfile/>
                            </div>
                        </CardBody>
                    </Card>
            </FadeIn>
        )
    }
}

export default Inbox_Page;
