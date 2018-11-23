import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import {Icon} from 'semantic-ui-react';
import './Profile_Page.css';
import TwittContainer from "../Tweets/Twitt_Container/Twitt_Container";
import UserCardContainer from '../UserCard/UserCardContainer/UserCardContainer'

import FadeIn from 'react-fade-in';

import ModalProfilePicture from '../Modal/Modal_ProfilePicture/Modal_ProfilePicture';

const Timestamp = require('react-timestamp');
const crypto = require('crypto');

class Edit_Profile extends Component {

    constructor() {
        super();
        this.state = {
            userLoginId: '',
            tweetUserId: '',
            username: '',
            timestamp: '',
            email: '',
            phone: '',
            profilePicture: '',
            followingData: '',
            followersData: '',
            tweetCount: '',
            tweetItem: true,
            followingItem: false,
            followerItem: false,
            modalProfilePicture: false,
            isFollow: false,
            isButtonInbox: false,
            tweetsTabClicked: true,
            followingTabClicked: false,
            followerTabClicked: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButtonProfile",
            userLoginFollowingData: '',
            roomMessagesId: ''
        };

        this.getTweetCounter = this.getTweetCounter.bind(this);
        this.handleItemClicked = this.handleItemClicked.bind(this);
        this.openProfilePicture = this.openProfilePicture.bind(this);
        this.closeProfilePicture = this.closeProfilePicture.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.followButton = this.followButton.bind(this);
        this.buttonInbox = this.buttonInbox.bind(this);
        this.inboxClicked = this.inboxClicked.bind(this);
    }

    componentWillMount() {
        this.setState({
            roomMessagesId: crypto.randomBytes(20).toString('hex')+Date.now()
        })
        if(this.props.tabClicked){
            if(this.props.tabClicked.tweetsTabClicked){
                this.setState({
                    tweetsTabClicked: true,
                    followingTabClicked: false,
                    followerTabClicked: false,
                });
                this.getProfileData();
            }

            else if(this.props.tabClicked.followingTabClicked){
                this.setState({
                    tweetsTabClicked: false,
                    followingTabClicked: true,
                    followerTabClicked: false,
                    tweetCount: this.props.tabClicked.tweetCount
                });
                this.getProfileData();
            }

            else if(this.props.tabClicked.followerTabClicked){
                this.setState({
                    tweetsTabClicked: false,
                    followingTabClicked: false,
                    followerTabClicked: true,
                    tweetCount: this.props.tabClicked.tweetCount
                });
                this.getProfileData();
            }
        }
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
                    followersData: user.followers,
                    userLoginFollowingData: user.following
                });
            });
            this.setState({
                tweetUserId: this.props.userId,
                userLoginId: this.props.userId
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
            });
            this.setState({
                tweetUserId: this.props.userIdProfile.userId,
                userLoginId: this.props.userLoginId
            });

            //buat bandingin udh pernah follow atau belum
            axios.get('/api/users/profile/' + this.props.userLoginId).then(res => {
                const user = res.data[0];
                console.log(user.following);
                console.log(this.props.userIdProfile.userId);

                if (user.following.includes(this.props.userIdProfile.userId)) {
                    this.setState({
                        isFollow: true,
                        isButtonInbox: true,
                        buttonFollowText: "Followed",
                        butttonFollowCondition: "followedButtonProfile"
                    });
                }
                this.setState({
                    userLoginFollowingData: user.following
                });
            });
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
        if (this.state.isFollow) {
            this.setState({buttonFollowText: "Unfollow"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }

    }

    mouseLeave() {
        if (this.state.isFollow) {
            this.setState({buttonFollowText: "Followed"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }
    }

    onButtonClicked() {
        this.setState({isFollow: !this.state.isFollow});

        if (this.state.isFollow) {
            axios.put('/api/users/unfollow/' + this.props.userIdProfile.userId).then(res => {
                this.setState({butttonFollowCondition: "followButtonProfile"})
            });
        }
        else {
            axios.put('/api/users/follow/' + this.props.userIdProfile.userId).then(res => {
                this.setState({butttonFollowCondition: "followedButtonProfile"})
            });
        }
    }

    followButton(userId){
        if(userId !== localStorage.getItem("myThings")){
            return (
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
            );
        }
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" "
                     id="profileImage"
                     src={require(`../../uploads/${imageUrl}`)}
                     className="float-right"
                     onClick={() => this.openProfilePicture()}/>);
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profileImage"
                     onClick={() => this.openProfilePicture()}/>
            );
        }
    }

   handleItemClicked(item) {
        if (item === "Follower") {
            if (this.props.userId) {
                this.props.history.replace({
                    pathname: '/home/myProfile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.state.userLoginId,
                        tweetCount: this.state.tweetCount,
                        followerTabClicked: true
                    }
                })
            }

            else if(this.props.userIdProfile.userId){
                this.props.history.replace({
                    pathname: '/home/profile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.props.userIdProfile.userId,
                        tweetCount: this.state.tweetCount,
                        followerTabClicked: true
                    }
                })
            }
        }
        else if (item === "Following") {
            if (this.props.userId) {
                this.props.history.replace({
                    pathname: '/home/myProfile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.state.userLoginId,
                        tweetCount: this.state.tweetCount,
                        followingTabClicked: true
                    }
                })
            }

            else if(this.props.userIdProfile.userId){
                console.log(this.props.userIdProfile.userId)
                this.props.history.replace({
                    pathname: '/home/profile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.props.userIdProfile.userId,
                        tweetCount: this.state.tweetCount,
                        followingTabClicked: true
                    }
                })
            }
        }

        else if (item === "Tweets") {

            if (this.props.userId) {
                this.props.history.replace({
                    pathname: '/home/myProfile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.state.userLoginId,
                        tweetsTabClicked: true
                    }
                })
            }

            else if(this.props.userIdProfile.userId){
                this.props.history.replace({
                    pathname: '/home/profile/' + this.state.username.replace(' ', '-'),
                    state: {
                        userId: this.props.userIdProfile.userId,
                        tweetsTabClicked: true
                    }
                })
            }
        }
    }

    buttonInbox(){
        if(this.state.isButtonInbox){
            return (
                <div
                    id="inboxButtonContainer"
                    onClick={() => this.inboxClicked()}
                >
                    <center>
                        <Icon
                            size='large'
                            name='envelope outline'
                            id='iconInbox'
                        />
                        {' '} Inbox
                    </center>
                </div>
            );
        }
    }

    inboxClicked(){
        axios.get('/api/inbox/listContactInbox')
            .then(res => {
                if(res.data.length === 0){
                    this.goToInboxPage();
                }
                else{

                    let listContactInbox = []

                    for(let i=0; i<res.data.length; i++){
                        listContactInbox.push(res.data[i].userReceiverId)
                    }

                    //Untuk Ngecek apakah dia sudah pernah dm atau belum
                    if (listContactInbox.includes(this.props.userIdProfile.userId)) {
                        this.props.history.push({
                            pathname: `/home/inbox`
                        })
                    }
                    else{
                        this.goToInboxPage();
                    }


                }
            });
    }

    goToInboxPage(){
        const firstUserReceiverInformation = {
            userId: this.props.userLoginId,
            username: this.props.username,
            profilePicture: this.props.profilePicture,
            userReceiverId: this.props.userIdProfile.userId,
            userReceiverName: this.state.username,
            profileReceiverPicture: this.state.profilePicture,
            roomMessagesId: this.state.roomMessagesId
        };
        const secondUserReceiverInformation = {
            userId: this.props.userIdProfile.userId,
            username: this.state.username,
            profilePicture: this.state.profilePicture,
            userReceiverId: this.props.userLoginId,
            userReceiverName: this.props.username,
            profileReceiverPicture: this.props.profilePicture,
            roomMessagesId: this.state.roomMessagesId
        };
        axios({
            method: 'post',
            responseType: 'json',
            url: `http://localhost:3001/api/inbox/message`,
            data: firstUserReceiverInformation
        })
        .then(axios({
            method: 'post',
            responseType: 'json',
            url: `http://localhost:3001/api/inbox/message`,
            data: secondUserReceiverInformation
        }))
        .then((response) => {
            this.props.history.push({
                pathname: `/home/inbox`
            })
        });
    }

    render() {
        let content;

        if (this.state.tweetsTabClicked) {
            content = <TwittContainer history={this.props.history}
                                      TweetUserId={this.state.tweetUserId}
                                      userId={this.state.userLoginId}
                                      username={this.state.username}
                                      tweetCounter={this.getTweetCounter}
                                      isProfile="profile"
                                      profilePicture={this.props.profilePicture}
                                      located="profile"
            />;
        } else if (this.state.followingTabClicked) {
            content = <UserCardContainer
                located="inProfilePage"
                userLoginFollowingData={this.state.userLoginFollowingData}
                history={this.props.history}
                followingData={this.state.followingData}
            />;
        } else if (this.state.followerTabClicked) {
            content = <UserCardContainer
                located="inProfilePage"
                userLoginFollowingData={this.state.userLoginFollowingData}
                history={this.props.history}
                followersData={this.state.followersData}
            />;
        }

          return (
              <FadeIn>
                <div className="profile">
                    <div id="detailProfile" className="ui card">
                        <div className="image" id="profilePicture">
                            {this.setProfileImage(this.state.profilePicture)}
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

                        {this.buttonInbox()}

                        {this.followButton(this.state.tweetUserId)}

                    </div>

                    <div id="navDetail" className="ui three item menu">
                        <a className="item"
                           onClick={() => this.handleItemClicked("Tweets")}> Tweets <br/><br/>{this.state.tweetCount}
                        </a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Following")}>Following <br/><br/>{this.state.followingData.length}
                        </a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Follower")}>Followers <br/><br/>{this.state.followersData.length}
                        </a>
                    </div>

                    <FadeIn>
                        <div className="userProfile" id="profileInfo">
                            {content}
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
