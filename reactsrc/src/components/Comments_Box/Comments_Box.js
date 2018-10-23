import React, {Component} from "react";
import {Form, TextArea, Image} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Comments_Box.css'
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios/index";
import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.153:8000');

class Comments_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetStatus: '#4db6ac',
            charCounter: 100,
            userId: this.props.userId,
            username: this.props.username,
            commentText: '',
            profilePicture: this.props.profilePicture,
            timstamp: '',
            allComments: this.props.tweet.comments,
            tweetImage: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        const username = this.props.username;
        this.setState({
            userId: userId,
            username: username,
            commentId: []
        });

    }

    handleInputChange(e) {
        if (this.state.charCounter > 50) {
            this.setState({
                tweetStatus: '#4db6ac'
            });
        }
        if (this.state.charCounter < 50) {
            this.setState({
                tweetStatus: '#ffbe76'
            });
        }
        if (this.state.charCounter < 50) {
            this.setState({
                tweetStatus: '#ff7675'
            });
        }
        if (this.state.charCounter === 100) {
            this.setState({
                commentText: '',
                tweetStatus: '#4db6ac'
            });
        }
        if (e.target.value.length > 100) {
            this.setState({
                commentText: '',
                tweetStatus: '#ff7675'
            });
        }
        this.setState({
            [e.target.name]: e.target.value,
            charCounter: 100 - e.target.value.length
        });
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

    comment() {
        console.log(this.props.username);

        const commentData = {
            userId: this.props.userId,
            username: this.props.username,
            commentText: this.state.commentText,
            profilePicture: this.props.profilePicture,
            commentTimestamp: new Date(),
            tweetId: this.props.tweet._id
        };
          axios({
              method: 'PUT',
              url: `http://localhost:3001/api/tweet/commentTweet/` + this.props.tweet._id,
              data: commentData
          })
          .then(res => {

              if(this.props.isHome){
                  this.props.getTweetData();
              }
              else if(this.props.isProfile){
                  this.props.showUserProfileFromTweets(this.props.tweet.userId);
              }

              this.setState({
                  commentText: '',
                  charCounter: 100
              });
              socket.emit('sendComment', res.data);
          })
    }

    render() {
        return (
            <Form id="Comment_Container" onSubmit={this.handleSubmit}>
                <Image avatar id="avatarBoxComment">
                    {this.setProfileImage(this.props.profilePicture)}
                </Image>

                <Form.Field
                    value={this.state.commentText}
                    id='boxComment'
                    type="text"
                    maxLength="100"
                    control={TextArea}
                    placeholder="Write A Comment..."
                    style={{maxHeight: "60px", minHeight: "50px", marginBottom: "10px"}}
                    name="commentText"

                    onChange={this.handleInputChange}
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            this.comment();
                        }
                    }}
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
