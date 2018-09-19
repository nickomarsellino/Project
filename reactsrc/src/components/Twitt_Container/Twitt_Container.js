import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

//load another component
import ModalTwitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../Modal/Modal_Delete/Modal_Delete';

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
            userProfilePicture: '',
            modalTweet: false,
            modalDelete: false,
            hasMore: true,
            lengthData: '',
            totalLengthData: '',
            pagesData: 1
        };

        this.getTweetData = this.getTweetData.bind(this);
        this.getTweetUser = this.getTweetUser.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalTweet = this.closeModalTweet.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentWillMount() {
        if (this.props.TweetUserId) {
            this.getTweetUser();
        }
        else {
            this.getTweetData();
            // socket.on('getData', namavariabel => {
            //     console.log("isi Nama Variabel: ",namavariabel);
            //     this.setState({
            //         tweetData: this.state.tweetData.concat(namavariabel)
            //     })
            // })
        }
    }


    getTweetUser() {
        axios.get('/api/tweet/profiletweet/' + this.props.TweetUserId + '?perPage=5&page=1')
            .then(res => {
                this.setState({
                    tweetData: res.data.docs,
                    tweetCounter: res.data.total,
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
                        lengthData: res.data.docs.length
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

    onClickedImageProfile(userId, username){

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

    viewTweetPicture(tweetPicture, userId){
        if(this.props.located === "profile"){
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
        else{
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

    isEmptyTweet(){
        if(this.props.located === "profile"){
            if(this.state.tweetCounter === 0){
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
                }, 1000);
            }
        }
        else{
            if (this.state.lengthData === this.state.totalLengthData) {
                this.setState({hasMore: false});
            }
            else{
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
        return (
            <FadeIn>
                <InfiniteScroll
                    dataLength={this.state.lengthData}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                >
                    <div>
                        {this.isEmptyTweet(this.state.tweetData)}
                        {this.state.tweetData.map(tweet =>
                            <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                                <CardBody className="Tweet">
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                                {this.setProfileImage(tweet.profilePicture, tweet.userId, tweet.username)}
                                            </Feed.Label>
                                            <Feed.Content className="Tweet-Content">

                                                {this.viewUserProfile(tweet.username, tweet.userId)}

                                                <Feed.Extra onClick={() => this.openModalTweet(tweet._id)} id="tweetText" text content={tweet.tweetText}/> <br/>

                                                {this.viewTweetPicture(tweet.tweetPicture, tweet._id)}

                                                <Feed.Date onClick={() => this.openModalTweet(tweet._id)} id="tweetText" content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                                <div className="buttonGroup">
                                                    <Icon.Group className="likesIcon">
                                                        <Icon name='like' /> {" "} 10 Likes
                                                    </Icon.Group>
                                                    <Icon.Group className="commentsIcon">
                                                        {" "}<Icon name='comments'/> {" "} 10 Comments
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
                        )}

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
                </InfiniteScroll>
            </FadeIn>
        );
    }
}

export default Twitt_Container;
