import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';

import profile from '../../../daniel.jpg';

class Modal_ProfilePicture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: []
        };
        this.openModal = this.openModal.bind(this);
    }


    openModal() {
        //Akses Fungsi yang di Twitt_Container.js
        this.props.isClose(this.props.isOpen);
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img style={{width: "400px"}} alt=" " src={require(`../../../uploads/${imageUrl}`)}/>
            );
        }
        else {
            return (
                <img style={{width: "400px"}} alt=" " src={profile}/>
            );
        }
    }


    render() {
        return (
            <Container id="modalProfilePicture">
                <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
                    <ModalHeader toggle={this.openModal}>
                        {this.props.username}
                    </ModalHeader>
                    <ModalBody>
                        <center>
                        <div style={{width: "100%"}}>
                                {this.setProfileImage(this.props.profilePicture)}
                        </div>
                        </center>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}


export default Modal_ProfilePicture;
