import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import {Form, TextArea, Image, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Twiit_Box.css'
import axios from "axios/index";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');

class Twitt_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetStatus: '#4db6ac',
            charCounter: 160,
            userId: '',
            username: '',
            userTweet: '',
            profilePicture: '',
            likes: null,
            selectedFile: [],
            tweetImage: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        const username = this.props.username;

        this.setState({
            userId: userId,
            username: username,
        });

    }

    handleInputChange(event) {
        if (this.state.charCounter > 70) {
            this.setState({
                tweetStatus: '#4db6ac'
            });
        }
        if (this.state.charCounter < 70) {
            this.setState({
                tweetStatus: '#ffbe76'
            });
        }
        if (this.state.charCounter < 30) {
            this.setState({
                tweetStatus: '#ff7675'
            });
        }
        if (this.state.charCounter === 160) {
            this.setState({
                userTweet: '',
                tweetStatus: '#4db6ac'
            });
        }
        if (event.target.value.length > 160 ) {
            this.setState({
                userTweet: '',
                tweetStatus: '#ff7675'
            });
        }
        this.setState({
            userTweet: event.target.value,
            charCounter: 160 - event.target.value.length
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        const tweetData = {
            tweetText: this.state.userTweet,
            username: this.state.username,
            userId: this.state.userId,
            tweetImage: this.state.tweetImage,
            profilePicture: this.props.profilePicture
        };
        axios({
            method: 'post',
            responseType: 'json',
            url: `api/tweet/posting`,
            data: tweetData
        })
            .then((response) => {
                this.setState({
                    userTweet: '',
                    charCounter: 160
                });
                //Upload Image ke table tweet
                let formData = new FormData();

                formData.append('tweetPicture', this.state.selectedFile);

                axios.put('/api/tweet/postingImage/'+response.data._id, formData)
                    .then((result) => {

                        // const tweetDataAndImage ={
                        //     tweetText: this.state.userTweet,
                        //     username: this.state.username,
                        //     userId: this.state.userId,
                        //     tweetImage: this.state.tweetImage,
                        //     profilePicture: this.props.profilePicture,
                        //     tweetPicture : result.data.tweetPicture
                        // }
                        //
                       // socket.emit('sendTheData', response.data);
                    })
                    .catch(() => {
                        socket.emit('sendTheData', response.data);
                    });
            });
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    fileSelectedHandler = event => {

        // Check kalo ada file nya (image)
        if (event.target.files != null || event.target.files[0] != null) {
            // ini buat get image nya
            this.setState({
                selectedFile: event.target.files[0]
            });
        }
        else {
            this.setState({
                selectedFile: event.target.files[0]
            });
        }
    };

    handleCancel(){
        this.setState({
            selectedFile: ''
        });
    }


    render() {

        let imageUrl = this.props.profilePicture;
        let imagedisplay

        if(imageUrl){
            imagedisplay = <img alt=" " src={require(`../../uploads/${imageUrl}`)} className="float-right" />
        }
        else{
            imagedisplay = <img alt=" "  src={profile} />
        }

        return (
            <div className="Tweet-Container">
                <Card>
                    <CardBody>
                        <div className="profileBox">
                            <Image src={profile} avatar id="avatarBox">
                                {imagedisplay}
                            </Image>
                            <span><h5 id="nameBox">{this.state.username}</h5></span>
                        </div>
                        <Form id="Form_Container" onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <Form.Field
                                value={this.state.userTweet}
                                id='form-textarea-control-opinion'
                                type="text"
                                maxLength="160"
                                control={TextArea}
                                placeholder={"Have a nice day " + this.state.username}
                                style={{maxHeight: "100px", minHeight: "90px"}}
                                name="userTweet"
                                onChange={this.handleInputChange}
                            />
                            <div className="buttonBox">
                                <div>
                                    <Icon.Group size='large' id="addImageButton" onClick={this.handleClick.bind(this)}>
                                        <Icon name='images'/>
                                        <Icon corner name='add'/>
                                    </Icon.Group>
                                    <span>
                                        <p id="imageName">
                                            {!this.state.selectedFile.name?
                                                this.state.selectedFile.name
                                                :
                                                <p>{this.state.selectedFile.name}
                                                    {" "}<Icon link name='cancel' id="cancelPicture" onClick={this.handleCancel.bind(this)}/>
                                                </p>
                                            }
                                        </p>
                                    </span>
                                </div>
                                <input type="file" id="tweetImage" ref="fileUploader" style={{display: "none"}} onChange={this.fileSelectedHandler} />

                                <Button color="default"
                                        size="md"
                                        id="postButton"
                                        type="submit"
                                        style={{borderRadius: "100px"}}
                                        disabled={!this.state.userTweet}
                                >Post</Button>

                                <p id="limiter-Tweet" style={{color: this.state.tweetStatus}}>
                                    {this.state.charCounter}
                                </p>

                                <span>
                                    <div id='limiter-Tweet-Circular'>
                                        <CircularProgressbar
                                            percentage={
                                                this.state.charCounter
                                            }
                                            background
                                            backgroundPadding={1}
                                            strokeWidth={50}
                                            styles={{
                                                background: {
                                                    fill: this.state.tweetStatus
                                                },
                                                path: {
                                                    strokeLinecap: "butt",
                                                    stroke: "#ffff"
                                                },
                                                trail: {stroke: "transparent"}
                                            }}
                                        />
                                    </div>
                                </span>

                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Twitt_Box;
