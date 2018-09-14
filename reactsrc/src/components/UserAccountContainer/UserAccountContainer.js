import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserAccountContainer.css';
import profile from '../../daniel.jpg';

class UserAccountContainer extends Component {

    constructor() {
        super();
        this.state = {
            userData: []
        };
    }

    componentWillMount() {

        if(this.props.userSearch){
            this.setState({
                userData: this.props.userSearch
            });
        }
        else {
            axios.get('/api/users/allUsers/')
                .then(res => {
                    this.setState({
                        userData: res.data
                    });
                    //console.log(res.data);
                });
        }

    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " id="ProfileImage" src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="ProfileImage"/>
            );
        }
    }

    viewUserProfile(username, userId) {
        if(localStorage.getItem("myThings") === userId){
            this.props.history.push({
                pathname: `/home/myProfile/${username}`.replace(' ', ''),
            })
        }
        else {
            this.props.history.push({
                pathname: `/home/profile/${username}`.replace(' ', ''),
                state: {
                    userId: userId
                }
            })
        }
    }

    render() {
        return (
            <div className="peopleCards">
                {this.state.userData.map(user =>
                    <div className="col-lg-3 col-lg-offset-4 user-Container">
                        <Card key={user._id}>
                            <center>
                                <Image style={{margin: "20px"}}
                                       onClick={() => this.viewUserProfile(user.username,user._id)}>
                                    {this.setProfileImage(user.profilePicture)}
                                </Image>
                            </center>
                            <Card.Content>
                                <center>
                                    <Card.Header className="profileName"
                                                 onClick={() => this.viewUserProfile(user.username,user._id)}>
                                        {user.username}
                                    </Card.Header>
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
