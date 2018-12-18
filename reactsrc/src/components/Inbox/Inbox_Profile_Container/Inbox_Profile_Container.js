import React, {Component} from "react";
import { List } from 'semantic-ui-react'
import axios from 'axios';

import './Inbox_Profile_Container.css';
import InboxProfileComponent from '../Inbox_Profile_Component/Inbox_Profile_Component'


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
                {this.state.inboxPeopleList.slice(0).reverse().map(people =>
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
