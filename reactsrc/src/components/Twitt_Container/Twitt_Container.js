import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import Loading from '../../LoadingGif.gif';
import InfiniteScroll from "react-infinite-scroll-component";

//load another component
import TweetComponent from '../TweetComponent/TweetComponent';

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');


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
            isLoading:true,
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
        if (this.props.TweetUserId) {
            console.log("BUKA PROFILE");
            console.log("Ini ID Profile: ",this.props.TweetUserId);
            this.showUserProfileFromTweets(this.props.TweetUserId);
        }
        else {
            console.log("BUKA HOME");
            this.getTweetData();
            socket.on('getData', namavariabel => {
                const allTweetData = this.state.tweetData;
                const newTweetData = [namavariabel].concat(allTweetData);

                this.setState({tweetData: newTweetData});
            })
        }
    }


    showUserProfileFromTweets(TweetUserId) {
        axios.get('/api/tweet/profiletweet/' + TweetUserId + '?perPage=5&page=1')

            .then(res => {
                this.setState({
                    tweetData: res.data.docs,
                    tweetCounter: res.data.length,
                    totalLengthData: res.data.total,
                    lengthData: res.data.docs.length,
                    isLoading:false
                })
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
                }, 2000);
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
                        <TweetComponent tweet={tweet}
                                        history={this.props.history}
                                        userId={this.props.userId}
                                        profilePicture={this.props.profilePicture}
                                        located="home"/>
                    )}
                </InfiniteScroll>
            </div>
        );
    }

}

export default Twitt_Container;