import React, {Component} from "react";
import { Container, Button, Modal, ModalBody, ModalHeader} from 'mdbreact';

class Modal_Twitt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetId: ''
        };
        this.openModal = this.openModal.bind(this);
        this.getData = this.getData.bind(this);
    }


    getData(tweetId) {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tweetId !== this.props.tweetId) {
            this.setState({ tweetId: nextProps.tweetId });
        }


    }

    openModal(){
        //Akses Fungsi yang di Twitt_Container.js
        this.props.isClose(this.props.isOpen);
    }


    render() {
        this.getData(this.props.tweetId);

        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
                    <ModalHeader toggle={this.openModal}>{this.state.tweetId}</ModalHeader>
                    <ModalBody>
                        (...)
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}


export default Modal_Twitt;