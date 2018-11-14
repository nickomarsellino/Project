import React, {Component} from "react";
import { List, Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import {Icon} from 'semantic-ui-react'
import axios from 'axios';

import './Inbox_Profile_Container.css';

class Inbox_Profile_Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
            inboxPeopleList: []
        };
    }

    componentDidMount(){
        this.getListContactInbox();
    }

    getListContactInbox(){
        axios.get('/api/inbox/listContactInbox')
            .then(res => {
                this.setState({
                    inboxPeopleList: res.data
                });
                console.log("res ", res.data);
            });
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" "
                     id="profileImage"
                     src={require(`../../../uploads/${imageUrl}`)}
                     className="float-right"
                     onClick={() => this.openProfilePicture()}/>);
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profileImage"
                     onClick={() => this.openProfilePicture()}/>
            );
        }
    }

    render() {
        console.log(this.props.userLoginId);
        return (
            <List id="listProfileContainer">
                {this.state.inboxPeopleList.map(people =>
                  <List.Item id="listItemProfile">
                      <Image avatar id="avatarItemContainer">
                          {this.setProfileImage(people.profileReceiverPicture)}
                      </Image>
                      <List.Content id="contentItemContainer">
                          <List.Header id="profileNameBox">{people.userReceiverName}</List.Header>
                          <Icon name='cancel'
                                size='large'
                                id="closeButton"/>
                          <br/>
                      </List.Content>
                      <hr/>
                  </List.Item>
                )}
            </List>
        )
    }
}

export default Inbox_Profile_Container;
