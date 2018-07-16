import React, {Component} from "react";

import { Alert } from 'react-bootstrap';

class MessageValidation extends Component {

    render() {
        return(
            <Alert bsStyle={this.props.form}>
                <strong><h3>{this.props.formStatus}</h3></strong>{this.props.formMessage}
            </Alert>
        );
    }
}


export default MessageValidation;