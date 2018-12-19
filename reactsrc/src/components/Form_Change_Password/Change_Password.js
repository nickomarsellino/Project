import React, {Component} from "react";
import axios from "axios/index";
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import {Form} from 'semantic-ui-react';
import FadeIn from 'react-fade-in';
import ReactDOM from "react-dom";

import './Change_Password.css'

class Change_Password extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isHidden: true,
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
            formMessage: "",
            formStatus: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;

        this.setState({[name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.newPassword !== this.state.newPasswordConfirmation) {
            //Render Validation box message
            ReactDOM.render(<MessageValidation
                form="danger"
                formStatus="Error"
                formMessage="New Password doesn't match....!"
            />, document.getElementById('messageValidation'));
        }
        
        else {
            const password = {
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
                newPasswordConfirmation: this.state.newPasswordConfirmation
            };

            axios({
                method: 'put',
                responseType: 'json',
                url: '/api/users/changePassword/'+this.props.userId,
                data: password,
                credentials: 'include',
                withCredentials: true
            })
                .then((response) => {
                    this.setState({
                        formStatus: 'Success',
                        formMessage: response.data.msg
                    });
                    ReactDOM.render(<MessageValidation
                        form="success"
                        formStatus={this.state.formStatus}
                        formMessage={this.state.formMessage}
                    />, document.getElementById('messageValidation'));

                })
                .catch((err) => {
                    if (err.response) {
                        this.setState({
                            formStatus: 'Error',
                            formMessage: err.response.data.msg
                        });
                    }
                    else {
                        this.setState({
                            formStatus: 'Error',
                            formMessage: 'Something went wrong. ' + err
                        });
                    }

                    //Render Validation box message
                    ReactDOM.render(<MessageValidation
                        form="danger"
                        formStatus={this.state.formStatus}
                        formMessage={this.state.formMessage}
                    />, document.getElementById('messageValidation'));
                });
        }
    }

    render() {
        return (
            <FadeIn>
                <div>
                    <Container className="col-lg-4 col-lg-offset-2">
                        <Card className="Card_Container">
                            <CardBody>
                                <center>
                                    <h1 id="headerChangePasssword">Change Password</h1>
                                </center>
                                <br/>
                                <Row>
                                    <Col md="12">
                                        <Form id="formChangePassword" onSubmit={this.handleSubmit}>
                                            <Form.Input required type="password" fluid label='Current Password'
                                                        placeholder="Enter your current password.."
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="currentPassword"
                                            />
                                            <br/><br/>
                                            <Form.Input required type="password" fluid label='New Password'
                                                        placeholder="Enter your new Password.."
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="newPassword"
                                            />

                                            <Form.Input required type="password" fluid label='Verify Password'
                                                        placeholder="Verify your new password.."
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="newPasswordConfirmation"
                                            />
                                            <div id="messageValidation"></div>
                                            <Button id="Submit_Button" block size="lg" type="submit">Save
                                                Changes</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </FadeIn>
        );
    }
}


export default Change_Password;
