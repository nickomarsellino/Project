import React, {Component} from "react";
import profile from '../../daniel.jpg';
import axios from 'axios';
import {Comment, Icon} from 'semantic-ui-react'
import './Recomendations_Component.css';


class Recomendations_Component extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillUpdate() {

    }

    componentWillMount() {

    }

    render() {

        return (
            <Comment.Group className="RecomendationComponent"
                           style={{marginLeft: "15px", marginRight: "15px", marginBottom: "10px", minWidth: "450px"}}>
                <Comment className="RecomendationGroup">
                    <Comment.Avatar
                        src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
                        className="RecomendationPicture"
                    />
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
