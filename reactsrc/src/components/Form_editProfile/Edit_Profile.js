import React, {Component} from "react";
import axios from "axios/index";
import { Container ,Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import { Form, Image } from 'semantic-ui-react';
import profile from '../../daniel.jpg';


class Edit_Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            username: "",
            email: "",
            password: "",
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

    getData(){
        axios.get('/api/users/'+this.props.userId)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    email: res.data.email,
                    password: res.data.password,
                    phone: res.data.phone
                });
                console.log(this.state);
            });
    }

    componentDidMount() {
        this.getData();
    }


    render(){
        return(
              <div>
                  <Container className="col-lg-4 col-lg-offset-2">
                      <Card style={{ marginTop: "10%", marginBottom:"10%"}} >
                          <CardBody>
                              <center>
                                  <h1>Profile</h1>
                                  <Image src={profile} size='medium' circular />
                              </center>
                              <Row>
                                  <Col md="12">
                                      <Form onSubmit={this.handleSubmit}>
                                          <Form.Input required type="text" fluid label='Username'
                                                      placeholder={this.state.username}
                                                      className={this.state.formStatus}
                                                      onChange={this.handleInputChange}
                                                      name="username"
                                          />

                                          <Form.Input required type="email" fluid label='Email'
                                                      placeholder={this.state.email}
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
                                                      placeholder={this.state.phone}
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
        );
    }
}


export default Edit_Profile;