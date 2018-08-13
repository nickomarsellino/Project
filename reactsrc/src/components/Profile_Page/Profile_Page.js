import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import './Profile_Page.css';
import TwittContainer from "../Twitt_Container/Twitt_Container";
import {Icon} from 'semantic-ui-react';
import FadeIn from 'react-fade-in';
import ReactDOM from "react-dom";

const Timestamp = require('react-timestamp');

class Edit_Profile extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            timestamp: '',
            email: '',
            phone: '',
            tweetCount: '',
            tweetItem: true,
            followingItem: false,
            followerItem: false
        };

        this.getTweetCounter = this.getTweetCounter.bind(this);
        this.handleItemClicked = this.handleItemClicked.bind(this);
    }

    componentWillMount() {
        this.getProfileData();
    }

    getTweetCounter(tweet){
        this.setState({tweetCount: tweet});
    }

    getProfileData() {
        // console.log(this.props.userId);
        axios.get('/api/users/').then(res => {
            this.setState({
                username: res.data.username,
                timestamp: res.data.timestamp,
                email: res.data.email,
                phone: res.data.phone
            });
        });
    }

    handleItemClicked(item){

        console.log(item);

        if(item === "Follower"){
            //Render Validation box message
            ReactDOM.render(<FadeIn>
                <p>Follower</p>
            </FadeIn>, document.getElementById('profileInfo'));
        }
        else if(item === "Following"){
            //Render Validation box message
            ReactDOM.render(<FadeIn>
                <p>Following</p>
            </FadeIn>, document.getElementById('profileInfo'));
        }
        else if(item === "Tweets"){
            //Render Validation box message
            ReactDOM.render(<FadeIn><TwittContainer TweetUserId={this.props.userId}
                                               userId={this.props.userId}
                                               tweetCounter={this.getTweetCounter}
            /></FadeIn>, document.getElementById('profileInfo'));
        }
    }

    render() {
        return (
            <FadeIn>
                <div className="profile">
                    <div id="detailProfile" className="ui card">
                        <div className="image">
                            <img className="profilePic" src={profile} alt=""/>
                        </div>
                        <div className="content">
                            <a className="header"><i className="user icon"/>{this.state.username}</a>
                            <div className="description">
                                <i className="calendar icon"/>Joined on <Timestamp time={this.state.timestamp}
                                                                                  format="date"/>
                            </div>
                            <div className="description">
                                <i className="envelope outline icon"/>
                                <a className="emailProfile" href="mailto:this.state.email">{this.state.email}</a>
                            </div>
                            <div className="description">
                                <i className="phone icon"/>{this.state.phone}
                            </div>
                        </div>
                    </div>

                    <div id="navDetail" className="ui three item menu">
                        <a className="item" onClick={() => this.handleItemClicked("Tweets")}> Tweets <br/><br/>{this.state.tweetCount}</a>
                        <a className="item" onClick={() => this.handleItemClicked("Following")}>Following <br/><br/>15</a>
                        <a className="item" onClick={() => this.handleItemClicked("Follower")}>Followers <br/><br/>15</a>
                    </div>

                    <div className="userProfile" id="profileInfo">
                        <TwittContainer TweetUserId={this.props.userId}
                                        userId={this.props.userId}
                                        tweetCounter={this.getTweetCounter}
                        />
                    </div>
                </div>
            </FadeIn>

        );
    }
}

export default Edit_Profile;
