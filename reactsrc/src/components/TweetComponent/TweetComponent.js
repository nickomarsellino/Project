import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../LoadingGif.gif';

//load another component
import ModalTwitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../Modal/Modal_Delete/Modal_Delete';

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.153:8000');



const Timestamp = require('react-timestamp');


class TweetComponent extends Component {

    constructor() {
        super();
        this.state = {
            tweetData: [],
            tweet: [],
            tweetCounter: '',
            userId: '',
            modalTweet: false,
            modalDelete: false,
            checkLikes: false
        };
        this.openModalDelete = this.openModalDelete.bind(this);
        this.setProfileImage = this.setProfileImage.bind(this);
        this.viewUserProfile = this.viewUserProfile.bind(this);
        this.buttonDelete = this.buttonDelete.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.closeModalTweet = this.closeModalTweet.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.onClickedImage = this.onClickedImage.bind(this);
    }

    onClickedImage(userId, username){

        if (this.props.located === "profile") {

        }
        else{
            if(this.props.userId === userId){
                this.props.history.push({
                    pathname: `/home/myProfile/${username}`.replace(' ', ''),
                })
            }
            else {
                this.props.history.push({
                    pathname: `/home/profile/${username}`.replace(' ', ''),
                    state: {
                        userId: userId
                    }
                })
            }
        }
    }

    setProfileImage(profilePicture, userId, username) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" "
                     src={require(`../../uploads/${imageUrl}`)}
                     id="profilePictureTweet"
                     onClick={() => this.onClickedImage(userId, username)}
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profilePictureTweet"
                     onClick={() => this.onClickedImage(userId, username)}
                />
            );
        }
    }

    viewUserProfile(username, userId) {
      // console.log("Func ViewUserPRofile ", username);
      // console.log("Func ViewUserPRofile ", userId);
      //   console.log('this.props.located ',this.props.located);
        if (this.props.located === "home") {
            //Jika id di container sam dengan yang login sekarang akan ke page "My Profile"
            if(userId === this.props.userId){
                return (
                    <Link to={{
                        pathname: `/home/myProfile/${username}`.replace(' ', ''),
                    }}>
                        <div>
                            <Feed.Summary content={username}/>
                        </div>
                    </Link>
                );
            }
            else{
                return (
                    <Link to={{
                        pathname: `/home/profile/${username}`.replace(' ', ''),
                        state: {
                            userId: userId
                        }
                    }}>
                        <div>
                            <Feed.Summary content={username}/>
                        </div>
                    </Link>
                );
            }
        }

        else if (this.props.located === "profile") {
            return (
                <div>
                    <Feed.Summary content={username}/>
                </div>
            );
        }
    }

    buttonDelete(userId, tweetId) {
        if (userId === this.props.userId) {
            return (
                <Icon
                    size='large' name='trash'
                    id="recycleIcon"
                    onClick={() => this.openModalDelete(tweetId)}
                />
            );
        }
    }

    openModalTweet(tweetId) {
        axios.get('/api/tweet/tweet/' + tweetId)
            .then(res => {
                this.setState({
                    tweet: res.data,
                    modalTweet: true
                });
            });
    }

    openModalDelete(tweetId) {
        axios.get('/api/tweet/tweet/' + tweetId)
            .then(res => {
                this.setState({
                    tweet: res.data,
                    modalDelete: true
                });
            });
    }

    clickLikeButton(userId){
        const likeData = {
            userId: this.props.userId,
        }

        if(this.state.checkLikes == true){
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/unlikeTweet/5ba0a65dea135d3f887ee28b`,
                data: likeData
            })
            .then(res => {
                this.setState({
                    checkLikes: false
                });
            })
        }
        else{
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/likeTweet/5ba0a65dea135d3f887ee28b`,
                data: likeData
            })
            .then(res => {
                this.setState({
                    checkLikes: true
                });
            })
        }
    }

    closeModalTweet(isOpen) {
        if (isOpen) {
            this.setState({
                modalTweet: false
            })
        }
    }

    closeModalDelete(isOpen) {
        if (isOpen) {
            this.setState({
                modalDelete: false
            })
        }
    }

    render() {
      console.log(this.props.tweet);
      const tweet = this.props.tweet;

      return (
      <div id="scrollableDiv" style={{ overflow: "auto" }}>
            <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                <CardBody className="Tweet">
                    <Feed>
                        <Feed.Event>
                            <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                {this.setProfileImage(tweet.profilePicture, tweet.userId, tweet.username)}

                            </Feed.Label>
                            <Feed.Content className="Tweet-Content">

                                {this.viewUserProfile(tweet.username, tweet.userId)}
                                {console.log("Tweet.Username nya: ", tweet.username)}

                                <Feed.Extra onClick={() => this.openModalTweet(tweet._id)} id="tweetText" text content={tweet.tweetText}/> <br/>

                                <Feed.Date onClick={() => this.openModalTweet(tweet._id)} id="tweetText" content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                <div className="buttonGroup">
                                    <Icon.Group className="likesIcon">
                                        <Icon name='like'
                                        onClick={() => this.clickLikeButton(this.props.userId)}> {tweet.likes.length} likes</Icon>
                                    </Icon.Group>
                                    <Icon.Group className="commentsIcon">
                                        {" "}<Icon name='comments'/> {" "} 0 Comments
                                    </Icon.Group>
                                </div>

                            </Feed.Content>

                            <Feed.Label className="Tweet-Delete">
                                {this.buttonDelete(tweet.userId, tweet._id)}
                            </Feed.Label>

                        </Feed.Event>
                    </Feed>
                </CardBody>
            </Card>
            <ModalTwitt
                            isOpen={this.state.modalTweet}
                            tweet={this.state.tweet}
                            isClose={this.closeModalTweet}
                            profilePicture={this.props.profilePicture}
                        />

                        <ModalDelete
                            isOpen={this.state.modalDelete}
                            tweet={this.state.tweet}
                            isClose={this.closeModalDelete}
                        />
      </div>
    );
  }
}

export default TweetComponent;
