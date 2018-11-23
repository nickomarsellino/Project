import React, {Component} from "react";
import { List, Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import axios from 'axios';

import './Inbox_Profile_Container.css';
import openSocket from 'socket.io-client';

const socket = openSocket('http://10.183.28.153:8000');

class Inbox_Profile_Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
            inboxPeopleList: [],
            chatDetailMessage:[]
        };
        this.getChatDetailMessage =
        this.getChatDetailMessage.bind(this)
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
            });
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

    getChatDetailMessage(_id){
        axios.get('/api/inbox/chatDetailMessage/' + _id)
            .then(res => {
                this.setState({
                    chatDetailMessage: res.data
                });
                this.props.history.replace({
                    pathname: '/home/inbox',
                    state: {
                        chatDetailMessage: res.data
                    }
                })
                this.props.sendTheMessageDetail(res.data)
                // Fungsi kirim ke parent inbox page

                this.props.history.replace({
                    pathname: '/home/inbox',
                    state: {
                        chatDetailMessage: res.data
                    }
                })
            });
     }

    render() {
        console.log(this.state.chatDetailMessage);
        return (
            <List id="listProfileContainer">
                {this.state.inboxPeopleList.map(people =>
                  <List.Item id="listItemProfile">
                      <Image avatar id="avatarItemContainer"
                              onClick={()=>this.getChatDetailMessage(people._id)}
                      >
                          {this.setProfileImage(people.profileReceiverPicture)}
                      </Image>
                      <List.Content id="contentItemContainer">
                          <List.Header id="profileNameBox"
                          onClick={()=>this.getChatDetailMessage(people._id)}>{people.userReceiverName}</List.Header>
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
