import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserAccountContainer.css';
import profile from '../../daniel.jpg';

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
                console.log(res.data);
            });
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile}/>
            );
        }
    }

    render() {
        return (
            <div className="peopleCards">
                {this.state.userData.map(user =>
                    <div className="col-lg-3 col-lg-offset-4 user-Container">
                        <Card key={user._id}>
                            <center>
                                <Image style={{margin: "20px"}} >
                                    {this.setProfileImage(user.profilePicture)}
                                </Image>
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
