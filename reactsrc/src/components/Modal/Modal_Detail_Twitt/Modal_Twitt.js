import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import {Image, Icon, Form, TextArea} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import './Modal_Twitt.css'
import {Link} from 'react-router-dom';


//load another component
import CommentsBox from "../../Comments_Box/Comments_Box";

const Timestamp = require('react-timestamp');


class Modal_Twitt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: []
        };
        this.openModal = this.openModal.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.tweet !== this.props.tweet) {
            this.setState({
                tweet: nextProps.tweet
            });
        }
    }

    openModal() {
        //Akses Fungsi yang di Twitt_Container.js
        this.props.isClose(this.props.isOpen);
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../../uploads/${imageUrl}`)} id="profilePictureTweet"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="profilePictureTweet"/>
            );
        }
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
                    <ModalHeader toggle={this.openModal}>
                        <div className="profileBox">
                            <Link to={{
                                pathname: `/home/profile/${this.state.tweet.username}`,
                                state: {
                                    userId: this.state.tweet.userId
                                }
                            }}>
                                <Image avatar id="avatarBox">
                                    {this.setProfileImage(this.state.tweet.profilePicture)}
                                </Image>
                                <span><h5 id="nameBox">{this.state.tweet.username}</h5></span>
                            </Link>
                        </div>
                    </ModalHeader>

                    <ModalBody className="text-warp">
                        <h5>{this.state.tweet.tweetText}</h5>
                    </ModalBody>

                    <ModalBody className="text-Timestamp">
                        <Timestamp time={this.state.tweet.timestamp} format='full' includeDay/>

                        <div id="buttonGroup">
                            <Icon.Group className="likesIcon">
                                <Icon name='like'/> {" "} 10 Likes
                            </Icon.Group>
                            <Icon.Group className="commentsIcon">
                                {" "}<Icon name='comments'/> {" "} 10 Comments
                            </Icon.Group>
                        </div>
                        <hr/>

                        <div className="commentBox">
                            <CommentsBox profilePicture={this.props.profilePicture}/>
                        </div>

                    </ModalBody>

                </Modal>
            </Container>
        );
    }
}


export default Modal_Twitt;
