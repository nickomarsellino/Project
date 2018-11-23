import React, {Component} from "react";
import { List, Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
    import {Icon} from 'semantic-ui-react'
import axios from 'axios';

import './Inbox_Profile_Container.css';
import openSocket from 'socket.io-client';
import InboxProfileComponent from '../Inbox_Profile_Component/Inbox_Profile_Component'

const socket = openSocket('http://10.183.28.153:8000');

class Inbox_Profile_Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
            inboxPeopleList: [],
            chatDetailMessage:[],
            messagesUnRead: ''
        };
    }

    componentWillMount(){
        this.getListContactInbox();
    }

    getListContactInbox(){
        axios.get('/api/inbox/listContactInbox')
            .then(res => {
                this.setState({
                    inboxPeopleList: res.data
                });
            });
    }


    render() {
        return (
            <List id="listProfileContainer">
                {this.state.inboxPeopleList.map(people =>
                    <InboxProfileComponent
                        history={this.props.history}
                        people={people}
                        sendTheMessageDetail = {this.props.sendTheMessageDetail}
                    />
                )}
            </List>
        )
    }
}

export default Inbox_Profile_Container;
