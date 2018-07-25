import React, {Component} from "react";
import { Container, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import './Modal_Delete.css'
import axios from "axios/index";

class Modal_Delete extends Component {

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
                tweet : nextProps.tweet
            });
        }
    }

    openModal(){
        //Akses Fungsi yang di Twitt_Container.js
        this.props.isClose(this.props.isOpen);
    }


    deleteTweet(tweetId){
        axios.delete('/api/users/tweet/'+tweetId)
            .then(() => {
                this.openModal();
                window.location.reload();
            });
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.openModal} centered>
                    <ModalHeader style={{backgroundColor: "#ff6b6b", color: "white"}} toggle={this.openModal}>Delete Post ?</ModalHeader>
                    <ModalBody>
                        Are you sure want to delete tweet from {this.state.tweet.username}

                        <br/>
                        <div className={"buttonModal"}>
                            <a onClick={this.openModal} id="myButtonNo">No</a>{' '}
                            <a onClick={() => this.deleteTweet(this.state.tweet._id)} id="myButtonYes">Yes</a>
                        </div>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}


export default Modal_Delete;