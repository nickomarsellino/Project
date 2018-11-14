import React, {Component} from "react";
import { List, Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import {Icon} from 'semantic-ui-react'

import './Inbox_Profile_Container.css';

class Inbox_Profile_Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home'
        };
    }

    render() {
        return (
            <List id="listProfileContainer">
                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src="https://react.semantic-ui.com/images/avatar/small/helen.jpg" alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar id="avatarItemContainer">
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content id="contentItemContainer">
                        <List.Header id="profileNameBox">Rachel</List.Header>
                        <Icon name='cancel'
                              size='large'
                              id="closeButton"/>
                        <br/>
                    </List.Content>
                    <hr/>
                </List.Item>
            </List>
        )
    }
}

export default Inbox_Profile_Container;
