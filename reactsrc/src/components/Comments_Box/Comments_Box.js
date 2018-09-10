import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import {Image, Icon, Form, TextArea} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import './Modal_Twitt.css'
import {Link} from 'react-router-dom';

const Timestamp = require('react-timestamp');


class Comments_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: []
        };
    }

    render() {
        return (
            <div></div>
        );
    }
}


export default Comments_Box;
