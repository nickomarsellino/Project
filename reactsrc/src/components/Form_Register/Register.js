import React, {Component} from "react";
import axios from 'axios';
import './Register.css'
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import FadeIn from 'react-fade-in';
import MessageValidation from '../MessageValidationBox/MessageValidation'

import {Form} from 'semantic-ui-react';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            formMessage: "",
            formStatus: "",
            isChecked: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isClicked = this.isClicked.bind(this);
    }


    handleInputChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({[name]: target.value});

    }

    isClicked(){

        if(this.state.isChecked){
            this.setState({
                isChecked: false
            });
        }
        else{
            this.setState({
                isChecked: true
            });
        }
    }

    handleSubmit(e) {

        e.preventDefault();


        if (this.state.password !== this.state.confirmPassword) {
            //Render Validation box message
            ReactDOM.render(<MessageValidation
                form="danger"
                formStatus="Error"
                formMessage="Passwords don't match"
            />, document.getElementById('messageValidation'));
        }

        if(!this.state.isChecked){
            //Render Validation box message
            ReactDOM.render(<MessageValidation
                form="danger"
                formStatus=" "
                formMessage="Please CheckList Bor."
            />, document.getElementById('messageValidation'));
        }

        else {
            const user = {
                username: this.state.username,
                email   : this.state.email,
                password: this.state.password,
                phone   : this.state.phone
            };

            const method = 'post';

            axios({
                method: method,
                responseType: 'json',
                url: `http://localhost:3000/api/users/register`,
                data: user
            })
                .then((response) => {
                    this.setState({
                        formStatus: 'Success',
                        formMessage: response.data.msg
                    });

                    //transfer to home again
                    this.props.history.push("/signin")
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
          };
        }

    render() {
        return (
            <div>
                <div id="navbar">
                    <Navbar/>
                </div>
                <FadeIn transitionDuration="500">
                    <Container className="col-lg-4 col-lg-offset-2">
                        <Card className="Card_Container">
                            <CardBody>
                                <center><h1>Register</h1></center>
                                <Row>
                                    <Col md="12">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Input required type="text" fluid label='Username'
                                                        placeholder='Username'
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="username"
                                            />

                                            <Form.Input required type="email" fluid label='Email'
                                                        placeholder='Email'
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="email"
                                            />

                                            <Form.Group unstackable widths={2}>
                                                <Form.Input required type="password" fluid label='Password'
                                                            placeholder='Password'
                                                            className={this.state.formStatus}
                                                            onChange={this.handleInputChange}
                                                            name="password"
                                                />

                                                <Form.Input required type="password" fluid label='Confirm Password'
                                                            placeholder='Confirm Password'
                                                            className={this.state.formStatus}
                                                            onChange={this.handleInputChange}
                                                            name="confirmPassword"
                                                />
                                            </Form.Group>


                                            <Form.Input required type="number" fluid label='Phone Number'
                                                        placeholder='Phone Number'
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="phone"
                                            />


                                            <Form.Checkbox label='I agree to the Terms and Conditions'
                                                           onClick={this.isClicked}
                                                           checked={this.state.isChecked}/>

                                            <div id="messageValidation"></div>

                                            <Button id="Submit_Button" block size="lg" type="submit">Register</Button>
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

export default Register;
