import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import {setInStorage} from '../../utils/storage';

import MessageValidation from '../MessageValidationBox/MessageValidation'
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
            success: false
        }
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
        }
        const method = 'post';
        axios({
            method: method,
            responseType: 'json',
            url: `http://localhost:3000/api/users/signin`,
            data: user
        })
            .then((response) => {
                //transfer to home again
                this.setState({
                    success: true
                });
                console.log("respponnya ", response);
                setInStorage('bebas', {
                    token: response.data.token,
                    userId: response.data.userId
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
                        <Card style={{marginTop: "25%"}}>
                            <CardBody>
                                <center><h1>Sign In</h1></center>
                                <Row>
                                    <Col md="12">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Input required type="email" fluid label='Email'
                                                        placeholder='Email'
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
                                            <Button block size="lg" style={{marginTop: "3%"}} type="submit">Sign
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
