import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import Loading from '../../LoadingGif.gif';
import InfiniteScroll from "react-infinite-scroll-component";

//load another component
import ModalTwitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../Modal/Modal_Delete/Modal_Delete';
import TweetComponent from '../TweetComponent/TweetComponent';

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');

const Timestamp = require('react-timestamp');

class Twitt_Container extends Component {

    constructor() {
        super();
        this.state = {
            tweetData: [],
            tweet: [],
            tweetCounter: '',
            userId: '',
            modalTweet: false,
            modalDelete: false,
            checkLikes: false,
            isLoading:true
            userProfilePicture: '',
            hasMore: true,
            lengthData: '',
            totalLengthData: '',
            pagesData: 1
        };
        this.getTweetData = this.getTweetData.bind(this);
        this.showUserProfileFromTweets = this.showUserProfileFromTweets.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        this.setState({
            userId: userId
        });

        if (this.props.TweetUserId) {
            this.showUserProfileFromTweets();
        }
        else {
            this.getTweetData();
            socket.on('getData', namavariabel => {
                const allTweetData = this.state.tweetData;
                const newTweetData = [namavariabel].concat(allTweetData);

                this.setState({tweetData: newTweetData});
            })
        }
    }


    showUserProfileFromTweets() {
        axios.get('/api/tweet/profiletweet/' + this.props.TweetUserId + '?perPage=5&page=1')

            .then(res => {
                this.setState({
                    tweetData: res.data.docs,
                    tweetCounter: res.data.length,
                    totalLengthData: res.data.total,
                    lengthData: res.data.docs.length
                });
                // get berapa banyak data tweet nya
                this.props.tweetCounter(res.data.total)
                // maksudnya dikirim ke profilepage, tweetCounter di profilepage
            });
    }

    getTweetData() {
        axios.get('/api/tweet/tweets' + '?perPage=5&page=1')
            .then(res => {
                this.setState(
                    {
                        tweetData: res.data.docs,
                        totalLengthData: res.data.total,
                        lengthData: res.data.docs.length,
                        isLoading:false
                    })
            });
    }

    openModalTweet(tweetId) {
        axios.get('/api/tweet/tweet/' + tweetId)
            .then(res => {
                console.log(res.data);
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

    onClickedImageProfile(userId, username) {

        if (this.props.located === "profile") {

        }
        else {
            if (this.props.userId === userId) {
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
                     onClick={() => this.onClickedImageProfile(userId, username)}
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                     id="profilePictureTweet"
                     onClick={() => this.onClickedImageProfile(userId, username)}
                />
            );
        }
    }

    viewTweetPicture(tweetPicture, userId) {
        if (this.props.located === "profile") {
            if (tweetPicture) {
                return (
                    <center>
                        <Image src={require(`../../../src/tweetImage/${tweetPicture}`)}
                               id="tweetImage"
                               onClick={() => this.openModalTweet(userId)}
                        />
                    </center>
                );
            }
        }
        else {
            if (tweetPicture) {
                return (
                    <Image src={require(`../../../src/tweetImage/${tweetPicture}`)}
                           fluid
                           style={{marginBottom: "20px", cursor: "pointer"}}
                           onClick={() => this.openModalTweet(userId)}
                    />
                );
            }
        }
    }

    viewUserProfile(username, userId) {
        if (this.props.located === "home") {
            //Jika id di container sam dengan yang login sekarang akan ke page "My Profile"
            if (userId === this.props.userId) {
                return (
                    <Feed.Summary content={username}
                                  onClick={() => this.onClickedImageProfile(userId, username)}
                    />
                );
            }
            else {
                return (
                    <Feed.Summary content={username}
                                  onClick={() => this.onClickedImageProfile(userId, username)}
                    />
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

    isEmptyTweet() {
        if (this.props.located === "profile") {
            if (this.state.tweetCounter === 0) {
                return (
                    <Card className="Tweet_Container" id="text-warp">
                        <CardBody className="Tweet">
                            <center>
                                <h3>Sorry, We Didnt Find Something In Here :) </h3>
                            </center>
                        </CardBody>
                    </Card>
                );
            }
        }
    }


    fetchMoreData() {

        if(this.props.located === "profile") {
            if (this.state.lengthData === this.state.totalLengthData) {
                this.setState({hasMore: false});
            }
            else {
                setTimeout(() => {
                    axios.get('/api/tweet/profiletweet/' + this.props.TweetUserId + '?perPage=5&page=' + parseInt(this.state.pagesData + 1, 10))
                        .then(res => {
                            const joined = this.state.tweetData.concat(res.data.docs);
                            this.setState({
                                tweetData: joined,
                                lengthData: parseInt(this.state.lengthData + res.data.docs.length, 10),
                                pagesData: parseInt(this.state.pagesData + 1, 10)
                            });
                        });
                }, 2000);
            }
        }

        else if (this.props.located === "home"){
            if (this.state.lengthData === this.state.totalLengthData) {
                this.setState({hasMore: false, lengthData: '', totalLengthData: ''});
            }
            else {
                setTimeout(() => {
                    axios.get('/api/tweet/tweets' + '?perPage=5&page=' + parseInt(this.state.pagesData + 1, 10))
                        .then(res => {
                            const joined = this.state.tweetData.concat(res.data.docs);
                            this.setState({
                                tweetData: joined,
                                lengthData: parseInt(this.state.lengthData + res.data.docs.length, 10),
                                pagesData: parseInt(this.state.pagesData + 1, 10)
                            });
                        });
                }, 1000);
            }
        }
    }

    render() {
      if(this.state.isLoading){
        return null
      }
      return (
      <div id="scrollableDiv" style={{ overflow: "auto" }}>
           <InfiniteScroll
                    dataLength={this.state.lengthData}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                >
                  {this.state.tweetData.map(tweet =>
                  <TweetComponent tweet={tweet} history={this.props.history} userId={this.props.userId}  located="home"/>
           </InfiniteScroll>
        )}

      </div>
    );
  }

}

export default Twitt_Container;
