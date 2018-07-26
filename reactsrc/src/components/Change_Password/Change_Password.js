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
            inputPassword: "",
            newPassword: "",
            formMessage: "",
            formStatus: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getData() {
        axios.get('/api/users/' + this.props.userId)
            .then(res => {
                this.setState({
                    userId: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                    phone: res.data.phone
                });
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone
        };

        axios({
            method: 'put',
            responseType: 'json',
            url: `http://localhost:3000/api/users/` + this.state.userId,
            data: user
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
                                            <Form.Input required type="text" fluid label='Current Password'
                                                        placeholder={this.state.username}
                                                        value={this.state.username}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="username"
                                            />
                                            <br/><br/>
                                            <Form.Input required type="text" fluid label='New Password'
                                                        placeholder={this.state.email}
                                                        value={this.state.email}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="email"
                                            />

                                            <Form.Input required type="text" fluid label='Verify Password'
                                                        placeholder={this.state.phone}
                                                        value={this.state.phone}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="phone"
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
