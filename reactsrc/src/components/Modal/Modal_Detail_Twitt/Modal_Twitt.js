import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';
import {Image} from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import './Modal_Twitt.css'

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

        console.log(this.state.tweet);

        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
                    <ModalHeader toggle={this.openModal}>
                        <div className="profileBox">
                            <Image avatar id="avatarBox">
                                {this.setProfileImage(this.state.tweet.profilePicture)}
                            </Image>
                            <span><h5 id="nameBox">{this.state.tweet.username}</h5></span>
                        </div>
                    </ModalHeader>

                    <ModalBody className="text-warp">
                        <h5>{this.state.tweet.tweetText}</h5>
                    </ModalBody>

                    <ModalBody>
                        <Timestamp time={this.state.tweet.timestamp} format='full' includeDay/>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}


export default Modal_Twitt;
