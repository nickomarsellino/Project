 import React, {Component} from "react";
import axios from 'axios';
import './Twiit_Container.css';
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
            isLoading: true,
            userProfilePicture: '',
            hasMore: true,
            lengthData: '',
            totalLengthData: '',
            pagesData: 1,
        };
        this.getTweetData = this.getTweetData.bind(this);
        this.showUserProfileFromTweets = this.showUserProfileFromTweets.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentWillMount() {
        if (this.props.TweetUserId) {
            this.showUserProfileFromTweets(this.props.TweetUserId);
        }
        else {
            this.getTweetData();
        }
    }


    componentWillReceiveProps(props) {
        console.log("INI PROPS: ", props)
    }

    // componentWillUpdate(nextProps, nextState) {
    //     if(nextState.tweetData !== this.state.tweetData){
    //         this.setState({
    //             tweetData: nextState.tweetData
    //         });
    //     }
    //     console.log(nextState.tweetData); //will show the new state
    //     console.log(this.state.tweetData); //will show the previous state
    // }

    getTweetData() {
        axios.get('/api/tweet/tweets?perPage=5&page=1')
            .then(res => {
                this.setState(
                    {
                        tweetData: res.data.docs,
                        totalLengthData: res.data.total,
                        lengthData: res.data.docs.length,
                        isLoading: false
                    })
            });
    }

    showUserProfileFromTweets(TweetUserId) {
        axios.get('/api/tweet/profiletweet/' + TweetUserId + '?perPage=5&page=1')

            .then(res => {
                this.setState({
                    tweetData: res.data.docs,
                    tweetCounter: res.data.length,
                    totalLengthData: res.data.total,
                    lengthData: res.data.docs.length,
                    isLoading: false
                })
                // get berapa banyak data tweet nya
                this.props.tweetCounter(res.data.total)
                // maksudnya dikirim ke profilepage, tweetCounter di profilepage
            });
    }

    fetchMoreData() {

        if (this.props.located === "profile") {
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

        else if (this.props.located === "home") {
            if (this.state.lengthData === this.state.totalLengthData) {
                this.setState({hasMore: false, lengthData: '', totalLengthData: ''});
            }
            else {
                setTimeout(() => {
                    axios.get('/api/tweet/tweets?perPage=5&page=' + parseInt(this.state.pagesData + 1, 10))
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
        if (this.state.isLoading) {
            return null
        }
        return (
            <div id="scrollableDiv" style={{overflow: "auto"}}>
                <InfiniteScroll
                    dataLength={this.state.lengthData}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                >
                    {this.state.tweetData.map(tweet =>
                        <TweetComponent tweet={tweet}
                                        lengthData={this.state.length}
                                        history={this.props.history}
                                        userId={this.props.userId}
                                        tweetUserId={this.props.TweetUserId}
                                        profilePicture={this.props.profilePicture}
                                        username={this.props.username}
                                        located="home"
                                        isHome={this.props.isHome}
                                        isProfile={this.props.isProfile}
                                        getTweetData={this.getTweetData}
                                        showUserProfileFromTweets={this.showUserProfileFromTweets}
                        >
                        </TweetComponent>
                    )}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Twitt_Container;
