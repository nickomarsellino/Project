import React, {Component} from "react";
import axios from "axios/index";
import './Edit_Profile.css';
import {Container, Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import {Form, Image, Dimmer, Loader} from 'semantic-ui-react';
import FadeIn from 'react-fade-in';
import profile from '../../daniel.jpg';
import ReactDOM from "react-dom";
import LoadingGif from '../../LoadingGif.gif';

class Edit_Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isHidden: true,
            userId: "",
            username: "",
            email: "",
            phone: "",
            formMessage: "",
            formStatus: "",
            selectedFile: [],
            file:"",
            imageId:'',
            status: false,
            isLoading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    getData() {
        axios.get('/api/users')
            .then(res => {
                this.setState({
                    userId: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                    phone: res.data.phone,
                    selectedFile: res.data,
                    isLoading: false
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

    fileSelectedHandler = event => {
        // console.log(event.target.files[0]);

        // Check kalo ada file nya (image)
        if (event.target.files != null || event.target.files[0] != null){
            // ini buat get image nya
            this.setState({
                selectedFile: event.target.files[0]
            });
            this.setState({
                status: true
            });


            // manage tampilan view pake javascript
            if(event.target.files && event.target.files[0]){
                var reader = new FileReader();
                // ketika image nya ke load
                reader.onload = (event) => {
                    document.getElementById("cover").setAttribute('src', event.target.result)
                }
                // iniii let the browser get data nya
                reader.readAsDataURL(event.target.files[0]);
            }
        } else {
            console.log("No data on the field..");
        }
    }

    handleSubmit(e) {
        console.log(this.state.isLoading);
        e.preventDefault();

        this.setState({
            isLoading: true
        });


        const user = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone
        };

        axios({
            method: 'put',
            responseType: 'json',
            url: `/api/users/editProfile`,
            data: user,
            credentials:'include',
            withCredentials: true
        })
            .then((response) => {
                this.setState({
                    formStatus: 'success',
                    formMessage: response.data.msg
                });

                let formData = new FormData();
                formData.append('profilePicture', this.state.selectedFile);

                axios.put('/api/users/editProfilePicture/'+this.state.userId, formData)
                    .then((result) => {

                    })
                    .catch(() => {
                        //Render Validation box message
                        ReactDOM.render(<MessageValidation
                            form="success"
                            formStatus="Success"
                            formMessage="Success Update Profile"
                        />, document.getElementById('messageValidation'));
                        });
            })
            .catch((err) => {
                if (err.response) {
                    this.setState({
                        formStatus: 'error',
                        formMessage: err.response.data.msg
                    });
                }
                else {
                    this.setState({
                        formStatus: 'error',
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

        let imageUrl = this.state.selectedFile.profilePicture;
        let imagedisplay

      if(imageUrl){
          imagedisplay = <img alt=" " src={require(`../../uploads/${imageUrl}`)} style={{width: '200px', height: '200px',marginTop:'-0.1rem'}} className="float-right" />
      }
      // else{
      //   <h2 className="lead">No Image</h2>
      // }

        // if(this.state.isLoading){
        //     return(
        //         <center>
        //             <div className="LoadingGif">
        //                 <img className="LoadingGif" src={LoadingGif} alt={" "}/>
        //             </div>
        //         </center>
        //     )
        // }

        return (
            <FadeIn>
                <div>
                    <Container className="col-lg-4 col-lg-offset-2">
                        <Card className="Card_Container">
                            <Dimmer active={this.state.isLoading} inverted>
                                <Loader size='large'>Loading</Loader>
                            </Dimmer>
                            <CardBody>
                                <center>
                                    <h1 id="headerEditProfile">Profile</h1>
                                    <Image id="cover" src={profile} size='small' circular>
                                        {imagedisplay}
                                    </Image>
                                    <br/>
                                    <center>
                                      <input type="file"  name="profilePicture" onChange={this.fileSelectedHandler} />
                                    </center>
                                </center>
                                <br/>
                                <Row>
                                    <Col md="12">
                                        <Form id="formEditProfile" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                            <Form.Input required type="text" fluid label='Username'
                                                        id="usernameInputForm"
                                                        placeholder={this.state.username}
                                                        value={this.state.username}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="username"
                                            />

                                            <Form.Input required type="email" fluid label='Email'
                                                        id="emailInputForm"
                                                        placeholder={this.state.email}
                                                        value={this.state.email}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="email"
                                                        disabled
                                            />

                                            <Form.Input required type="number" fluid label='Phone Number'
                                                        id="phoneInputForm"
                                                        placeholder={this.state.phone}
                                                        value={this.state.phone}
                                                        className={this.state.formStatus}
                                                        onChange={this.handleInputChange}
                                                        name="phone"
                                            />
                                            <div id="messageValidation"/>
                                            <Button id="Submit_Button" block size="lg" type="submit">Update
                                                Profile</Button>
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


export default Edit_Profile;
