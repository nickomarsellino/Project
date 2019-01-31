import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact";
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
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        HAhahahaha
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Notification_Container;
