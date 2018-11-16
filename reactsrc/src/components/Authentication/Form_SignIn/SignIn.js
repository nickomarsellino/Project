import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './SignIn.css'
import Footer from '../../Footer/Footer_Bar';
import Navbar from "../../Navbar/Navigationbar";
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../../MessageValidationBox/MessageValidation'
import {Form} from 'semantic-ui-react';
import FadeIn from 'react-fade-in';
import axios from "axios/index";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            token: "",
            formMessage: "",
            formStatus: "",
            success: false,
            timestamp: 'no timestamp yet'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        this.setState({[name]: target.value});
    }

    handleSubmit(e) {

        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios({
            method: 'post',
            responseType: 'json',
            url: `/api/authentication/signin`,
            data: user
        })
            .then((response) => {
                //transfer to home again
                this.setState({
                    success: true
                });

                this.props.history.push("/home");
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
            <div>
                <div id="navbar">
                    <Navbar success={this.state.success}/>
                </div>
                <FadeIn transitionDuration="500">
                    <Container className="col-md-4 col-md-offset-2">
                        <Card className="Card_container">
                            <CardBody>
                                <center><h1 id="headerSignIn">Sign In</h1>
                                </center>
                                <Row>
                                    <Col md="12">
                                        <Form id="formSignIn" onSubmit={this.handleSubmit}>
                                            <Form.Input required type="email" fluid label='Email'
                                                        placeholder='Email'
                                                        id="emailInputForm"
                                                        name="email"
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                            />

                                            <Form.Input required type="password" fluid label='Password'
                                                        placeholder='Password'
                                                        name="password"
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                            />

                                            <div id="messageValidation"></div>

                                            <Button id="Submit_Button" block size="lg" type="submit">Sign
                                                In</Button>
                                        </Form>

                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </FadeIn>
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}


export default SignIn;
