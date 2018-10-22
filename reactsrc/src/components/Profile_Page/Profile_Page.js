import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import {Icon} from 'semantic-ui-react';
import './Profile_Page.css';
import TwittContainer from "../Twitt_Container/Twitt_Container";
import UserCardContainer from '../UserCardContainer/UserCardContainer'
import FadeIn from 'react-fade-in';
import ReactDOM from "react-dom";

import ModalProfilePicture from '../Modal/Modal_ProfilePicture/Modal_ProfilePicture';

const Timestamp = require('react-timestamp');


class Edit_Profile extends Component {

    constructor() {
        super();
        this.state = {
            userLoginId: '',
            tweetUserId:'',
            username: '',
            timestamp: '',
            email: '',
            phone: '',
            profilePicture: '',
            followingData:'',
            followersData: '',
            tweetCount: '',
            tweetItem: true,
            followingItem: false,
            followerItem: false,
            modalProfilePicture: false,
            isFollow: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButtonProfile"
        };

        this.getTweetCounter = this.getTweetCounter.bind(this);
        this.handleItemClicked = this.handleItemClicked.bind(this);
        this.openProfilePicture = this.openProfilePicture.bind(this);
        this.closeProfilePicture = this.closeProfilePicture.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    // Kenapa sih ini?!

    componentWillMount() {
        this.getProfileData();
    }

    getTweetCounter(tweet) {
        this.setState({tweetCount: tweet});
    }

    getProfileData() {
        //Jika ia klik My Profile
        if (this.props.userId) {
            axios.get('/api/users/profile/' + this.props.userId).then(res => {
                const user = res.data[0];
                this.setState({
                    username: user.username,
                    timestamp: user.timestamp,
                    email: user.email,
                    phone: user.phone,
                    profilePicture: user.profilePicture,
                    followingData: user.following,
                    followersData: user.followers
                });
                console.log(user);
            });
            this.setState({
                tweetUserId: this.props.userId,
                userLoginId:this.props.userId
            })
        }

        //Jika ia Klik DI container tweetnya
        else if (this.props.userIdProfile.userId) {
            axios.get('/api/users/profile/' + this.props.userIdProfile.userId).then(res => {
                const user = res.data[0];
                this.setState({
                    userId: user._id,
                    username: user.username,
                    timestamp: user.timestamp,
                    email: user.email,
                    phone: user.phone,
                    profilePicture: user.profilePicture,
                    followingData: user.following,
                    followersData: user.followers
                });
                console.log(user);
            });
            this.setState({
                tweetUserId: this.props.userIdProfile.userId,
                userLoginId:this.props.userLoginId
            })
        }
    }

    handleItemClicked(item) {

console.log("ININYA: ", item);

        if (item === "Follower") {
            //Render Validation box message
            ReactDOM.render(<FadeIn>
                <UserCardContainer
                    history={this.props.history}
                    followersData={this.state.followersData}
                />
            </FadeIn>, document.getElementById('profileInfo'));
        }
        else if (item === "Following") {
            //Render Validation box message
            ReactDOM.render(<FadeIn>
              <UserCardContainer
                  history={this.props.history}
                  followingData={this.state.followingData}
              />
            </FadeIn>, document.getElementById('profileInfo'));
        }

        else if (item === "Tweets") {
            //Render Validation box message
            ReactDOM.render(
            <FadeIn>
            <TwittContainer history={this.props.history}
                            TweetUserId={this.state.tweetUserId}
                             userId={this.state.userLoginId}
                            username={this.state.username}
                            tweetCounter={this.getTweetCounter}
                            isProfile="profile"
                            profilePicture={this.props.profilePicture}
                            located="profile"
            />
            </FadeIn>, document.getElementById('profileInfo'));
        }
    }


    openProfilePicture() {
        this.setState({
            modalProfilePicture: true
        });
    }

    closeProfilePicture(isOpen) {
        if (isOpen) {
            this.setState({
                modalProfilePicture: false
            })
        }
    }

    mouseEnter() {
        if(this.state.isFollow){
            this.setState({buttonFollowText: "Unfollow"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }

    }

    mouseLeave() {
        if(this.state.isFollow){
            this.setState({buttonFollowText: "Followed"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }
    }

    onButtonClicked(){
        this.setState({ isFollow: !this.state.isFollow });

        if(this.state.isFollow){
            this.setState({ butttonFollowCondition: "followButtonProfile"})
        }
        else{
            this.setState({ butttonFollowCondition: "followedButtonProfile"})
        }
    }

    render() {
        let imageUrl = this.state.profilePicture;
        let imagedisplay

        if (imageUrl) {
            imagedisplay = <img alt=" "
                                id="profileImage"
                                src={require(`../../uploads/${imageUrl}`)}
                                className="float-right"
                                onClick={() => this.openProfilePicture()}/>
        }
        else {
            imagedisplay = <img alt=" "
                                src={profile}
                                id="profileImage"
                                onClick={() => this.openProfilePicture()}/>
        }
        return (
            <FadeIn>
                <div className="profile">
                    <div id="detailProfile" className="ui card">
                        <div className="image" id="profilePicture">
                            {imagedisplay}
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

                        <div
                            id={this.state.butttonFollowCondition}
                            onMouseEnter={this.mouseEnter}
                            onMouseLeave={this.mouseLeave}
                            onClick={() => this.onButtonClicked(this.state.isFollow)}
                        >
                            <center>
                                <Icon
                                    size='large'
                                    name='handshake'
                                    id='iconFollow'
                                />
                                {' '}{this.state.buttonFollowText}
                            </center>
                        </div>
                    </div>

                    <div id="navDetail" className="ui three item menu">
                        <a className="item"
                           onClick={() => this.handleItemClicked("Tweets")}> Tweets <br/><br/>{this.state.tweetCount}
                        </a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Following")}>Following <br/><br/>15</a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Follower")}>Followers <br/><br/>15</a>
                    </div>

                    <FadeIn>
                        <div className="userProfile" id="profileInfo">
                          <TwittContainer history={this.props.history}
                                          TweetUserId={this.state.tweetUserId}
                                           userId={this.state.userLoginId}
                                          username={this.state.username}
                                          tweetCounter={this.getTweetCounter}
                                          isProfile="profile"
                                          profilePicture={this.props.profilePicture}
                                          located="profile"
                          />
                        </div>
                    </FadeIn>
                </div>

                <ModalProfilePicture
                    isOpen={this.state.modalProfilePicture}
                    profilePicture={this.state.profilePicture}
                    username={this.state.username}
                    isClose={this.closeProfilePicture}
                />


            </FadeIn>
        );
    }
}

export default Edit_Profile;
