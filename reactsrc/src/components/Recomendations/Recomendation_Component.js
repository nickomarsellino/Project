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
                    alt=" " src={require(`../../uploads/${imageUrl}`)}
                    className="RecomendationPicture"
                />
            );
        }
        else {
            return (
                <Comment.Avatar
                    alt=" " src={profile}
                    className="RecomendationPicture"
                />
            );
        }
    }

    render() {

        return (
            <Comment.Group className="RecomendationComponent"
                           style={{marginLeft: "15px", marginRight: "15px", marginBottom: "10px", minWidth: "450px"}}>
                <Comment className="RecomendationGroup">
                        {this.setProfileImage(this.props.recomendation.profilePicture)}
                    <Comment.Content className="RecomendationUsername">
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
