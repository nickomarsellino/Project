import React, {Component} from "react";
import Navbar from "../Navbar/Navigationbar";
import { Container ,Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import { Form } from 'semantic-ui-react';

class Edit_Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            formMessage: "",
            formStatus: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({ [name]: target.value });

    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
          <div>
              <div id="navbar" >
                  <Navbar success={true} />
              </div>
              <div>
                  <Container className="col-lg-4 col-lg-offset-2">
                      <Card style={{ marginTop: "10%"}} >
                          <CardBody>
                              <center><h1>Profile</h1></center>
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

                                          <Form.Input required type="password" fluid label='Password'
                                                          placeholder='Password'
                                                          className={this.state.formStatus}
                                                          onChange={this.handleInputChange}
                                                          name="password"
                                          />

                                          <Form.Input required type="number" fluid label='Phone Number'
                                                      placeholder='Phone Number'
                                                      className={this.state.formStatus}
                                                      onChange={this.handleInputChange}
                                                      name="phone"
                                          />

                                          <div id="messageValidation"></div>
                                          <Button block size="lg" style={{ marginTop: "3%" }} type="submit">Update Profile</Button>
                                      </Form>

                                  </Col>
                              </Row>
                          </CardBody>
                      </Card>
                  </Container>
              </div>
          </div>
        );
    }
}


export default Edit_Profile;