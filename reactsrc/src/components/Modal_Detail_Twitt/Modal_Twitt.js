import React, {Component} from "react";
import {Container, Button, Modal, ModalBody, ModalHeader} from 'mdbreact';
import axios from "axios/index";
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
      this.setState({tweet: nextProps.tweet});
    }
  }

  openModal() {
    //Akses Fungsi yang di Twitt_Container.js
    this.props.isClose(this.props.isOpen);
  }

  render() {
    return (<Container>
      <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
        <ModalHeader toggle={this.openModal}>{this.state.tweet.username}</ModalHeader>
        <ModalBody>
          {this.state.tweet.tweetText}
        </ModalBody>
        <ModalBody>
          <Timestamp time={this.state.tweet.timestamp} format='full' includeDay="includeDay"/>
        </ModalBody>
      </Modal>
    </Container>);
  }
}

export default Modal_Twitt;
