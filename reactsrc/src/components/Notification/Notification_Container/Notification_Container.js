import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact";
import './Notification_Container.css'
import axios from 'axios';

//Load another component


class Notification_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        };
    }


    render() {
        return (
            <FadeIn>
                <Container className="col-lg-6 col-lg-offset-6" style={{marginBottom: "5%", marginTop: "3%"}}>
                        <h2 id="titlePage">Your Notification</h2>
                        <hr/>
                </Container>
            </FadeIn>
        )
    }
}

export default Notification_Container;
