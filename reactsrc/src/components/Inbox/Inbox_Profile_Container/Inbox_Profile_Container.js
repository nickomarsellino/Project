import React, {Component} from "react";
import { List, Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';


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
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>


                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>

                <List.Item id="listItemProfile">
                    <Image avatar>
                        <img src={profile} alt="" id="avatarItemProfile"/>
                    </Image>
                    <List.Content>
                        <List.Header as='a' id="profileNameBox">Rachel</List.Header> <br/>
                        <List.Description>
                            Last Minute Ago
                        </List.Description>
                    </List.Content>
                    <hr/>
                </List.Item>
            </List>
        )
    }
}

export default Inbox_Profile_Container;
