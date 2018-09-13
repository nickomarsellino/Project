import React, {Component} from "react";
import {Form, TextArea, Image} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Comments_Box.css'
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



class Comments_Box extends Component {

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
        if (e.target.value.length > 160) {
            this.setState({
                userTweet: '',
                tweetStatus: '#ff7675'
            });
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        const tweetData = {
            tweetText: this.state.userTweet,
            profilePicture: this.props.profilePicture
        };

        console.log(tweetData);

    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../../src/uploads/${imageUrl}`)} id="profilePicComment"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="profilePicComment"/>
            );
        }
    }

    render() {

        console.log("Profile Pic : ",this.props.profilePicture);

        return (
            <Form id="Comment_Container" onSubmit={this.handleSubmit}>
                <Image avatar id="avatarBoxComment">
                    {this.setProfileImage(this.props.profilePicture)}
                </Image>

                <Form.Field
                    value={this.state.userTweet}
                    id='boxComment'
                    type="text"
                    maxLength="160"
                    control={TextArea}
                    placeholder="Write A Comment..."
                    style={{maxHeight: "60px", minHeight: "50px", marginBottom: "10px"}}
                    name="userTweet"
                    onChange={this.handleInputChange}
                />

                <div className="buttonCommentBox">
                    <p id="limiter-Comment" style={{color: this.state.tweetStatus}}>
                        {this.state.charCounter}
                    </p>

                    <span>
                        <div id='limiter-Comment-Circular'>
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
        );
    }
}


export default Comments_Box;
