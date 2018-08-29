import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import {Form, TextArea, Image, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Twiit_Box.css'
import axios from "axios/index";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


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


    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            charCounter: 160 - e.target.value.length
        });

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
        if (e.target.value.length > 160 ) {
            this.setState({
                userTweet: '',
                tweetStatus: '#ff7675'
            });
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        const tweet = {
            tweetText: this.state.userTweet,
            username: this.state.username,
            userId: this.state.userId,
            tweetImage: this.state.tweetImage,
            profilePicture: this.props.profilePicture
        };

        const method = 'post';
        axios({
            method: method,
            responseType: 'json',
            url: `api/users/tweet`,
            data: tweet
        })
            .then(() => {
                window.location.reload();
            });
    }

    handleClick(e) {
        this.refs.fileUploader.click();
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
                        <Form id="Form_Container" onSubmit={this.handleSubmit}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                type="text"
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
                                </div>
                                <input type="file" id="tweetImage" ref="fileUploader" style={{display: "none"}} onChange={this.fileSelectedHandler} />
                                <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>


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
