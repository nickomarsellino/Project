import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserAccountContainer.css'
const Timestamp = require('react-timestamp');

class UserAccountContainer extends Component {

    constructor() {
        super();
        this.state = {
            userData: []
        };
    }

    componentWillMount() {
        axios.get('/api/users/allUsers/')
            .then(res => {
                this.setState({
                    userData: res.data
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.userData.map(user =>
                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>
                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>{user.username}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{<Timestamp time={user.timestamp} precision={1}/>}</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>
                )}
            </div>
        );
    }
}

export default UserAccountContainer;
