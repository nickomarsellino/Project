import React, {Component} from "react";
import axios from 'axios';
import profile from '../../daniel.jpg';
import {Comment, Icon} from 'semantic-ui-react'
import './Recomendations_Component.css';


class Recomendations_Component extends Component {

    constructor() {
        super();
        this.state = {};
    }


    componentWillMount() {

    }

    setProfileImage(profilePicture) {

        console.log(profilePicture);

        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <Comment.Avatar
                    onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                    alt=" " src={require(`../../uploads/${imageUrl}`)}
                    className="RecomendationPicture"
                />
            );
        }
        else {
            return (
                <Comment.Avatar
                    onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                    alt=" " src={profile}
                    className="RecomendationPicture"
                />
            );
        }
    }

    viewUserProfile(username, userId) {
        if (localStorage.getItem("myThings") === userId) {
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
        console.log("INI DATANYA: ",this.props.recomendation)
        return (
            <Comment.Group className="RecomendationComponent"
                           style={{marginLeft: "15px", marginRight: "15px", marginBottom: "10px", minWidth: "450px"}}>
                <Comment className="RecomendationGroup">
                        {this.setProfileImage(this.props.recomendation.profilePicture)}
                    <Comment.Content className="RecomendationUsername"
                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                    >
                        <Comment.Author>{this.props.recomendation.username}</Comment.Author>
                    </Comment.Content>

                    <Comment.Content className="RecomendationButton">
                        <Icon
                            size='large'
                            name='handshake'
                        />
                        {' '} Follow
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        );
    }
}

export default Recomendations_Component;
