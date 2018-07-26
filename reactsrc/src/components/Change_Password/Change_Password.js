import React, {Component} from "react";
import axios from "axios/index";
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import {Form, Image} from 'semantic-ui-react';
import FadeIn from 'react-fade-in';
import ReactDOM from "react-dom";


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
        }

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
                formMessage="New Passwords doesn't match......!"
            />, document.getElementById('messageValidation'));
        }

        const password = {
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            newPasswordConfirmation: this.state.newPasswordConfirmation
        };

        axios({
            method: 'put',
            responseType: 'json',
            url: `http://localhost:3000/api/users/changePassword` + this.state.userId,
            data: password
        })
            .then((response) => {
                this.setState({
                    formStatus: 'success',
                    formMessage: response.data.msg
                });

                //Render Validation box message
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

    render() {
        return (
            <FadeIn>
                <div>
                    <Container className="col-lg-4 col-lg-offset-2">
                        <Card className="Card_Container">
                            <CardBody>
                                <center>
                                    <h1>Change Password</h1>
                                </center>
                                <br/>
                                <Row>
                                    <Col md="12">
                                        <Form onSubmit={this.handleSubmit}>
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
