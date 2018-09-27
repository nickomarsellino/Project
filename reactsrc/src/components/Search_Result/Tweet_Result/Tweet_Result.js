import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../../../src/daniel.jpg';
import loading from '../../../loading.gif'
import axios from 'axios';
import './Tweet_Result.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import ModalDelete from '../../Modal/Modal_Delete/Modal_Delete';
import InfiniteScroll from "react-infinite-scroll-component";

import openSocket from 'socket.io-client';
const socket = openSocket('http://10.183.28.153:8000');
const Timestamp = require('react-timestamp');


class Tweet_Result extends Component {

    constructor() {
        super();
        this.state = {
            tweetResults: [],
            tweet: [],
            likes:'',
            modalDelete: false,
            hasMore: true,
            lengthData: '',
            pagesData: 1
        };

        this.getTweetSearch = this.getTweetSearch.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentWillMount() {
        this.getTweetSearch();

        this.setState({
          tweet: this.props.tweet,
        })

    }

    viewUserProfile(username, userId) {
        if (window.location.href === "http://localhost:3001/home/search/?" + this.props.searchValue) {
            if (userId === this.props.userId) {
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
            else {
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
    }

    getTweetSearch() {
        this.setState({
            lengthData: this.props.tweetResult.length,
            tweetResults: this.props.tweetResult
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

    closeModalDelete(isOpen) {
        if (isOpen) {
            this.setState({
                modalDelete: false
            })
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

    onClickedImage(userId, username) {
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

    setProfileImage(profilePicture, userId, username) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" "
                     src={require(`../../../uploads/${imageUrl}`)}
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

    viewTweetPicture(tweetPicture, userId) {
        if (tweetPicture) {
            return (
                <center>
                    <Image src={require(`../../../tweetImage/${tweetPicture}`)}
                           id="tweetImage"
                    />
                </center>
            );
        }
    }

    clickLikeButton(userId, tweetId){
        const likeData = {
            userId: this.props.userId,
            tweetId: this.props.tweet._id
        };
        console.log(this.state.tweet);
        const tweetLikesLength = this.state.likes;
        const checkValidID = tweetLikesLength.includes(userId);
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // Udabener ini
        if(checkValidID){
          console.log('UNLIKE');
                  axios({
                      method: 'PUT',
                      responseType: 'json',
                      url: `/api/tweet/unlikeTweet/` + this.state.tweet._id,
                      data: likeData
                  })
                  .then(res => {
                      this.setState({
                          checkLikes: false,
                          black: true
                      });
                      socket.emit('unlike', likeData)
                  })
        }
        else{
          console.log('LIKE');
                  axios({
                      method: 'PUT',
                      responseType: 'json',
                      url: `/api/tweet/likeTweet/` + this.state.tweet._id,
                      data: likeData
                  })
                  .then(res => {
                      this.setState({
                          checkLikes: true,
                          black: false
                      });
                      socket.emit('sendLike', likeData)
                  })
        }

    }

    fetchMoreData() {
        if (this.state.lengthData === this.props.tweetSearchLength) {
            this.setState({hasMore: false});
        }
        else{
            setTimeout(() => {
                axios.get('/api/tweet/searchByTweets/' + this.props.searchValue + '?perPage=5&page=' + parseInt(this.state.pagesData + 1, 10))
                    .then(res => {
                        const joined = this.state.tweetResults.concat(res.data.docs);
                        this.setState({
                            tweetResults: joined,
                            lengthData: parseInt(this.state.lengthData + res.data.docs.length, 10)
                        });
                    });
            }, 1000);
        }
    }

    render() {
      console.log(this.state.tweetResults);
        return (
            <FadeIn>
                <InfiniteScroll
                    dataLength={this.state.lengthData}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    // loader={<img id="loadingGif" src={loading} alt="loading..."/>}
                >
                    <div style={{marginTop: "2%"}}>
                        {this.state.tweetResults.map(tweet =>
                            <Card className="Tweet_Result" id="text-warp" key={tweet._id}>
                                <CardBody className="Tweet">
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                                {this.setProfileImage(tweet.profilePicture, tweet.userId, tweet.username)}
                                            </Feed.Label>
                                            <Feed.Content className="Tweet-Content">

                                                {this.viewUserProfile(tweet.username, tweet.userId)}

                                                <Feed.Extra id="tweetText" text content={tweet.tweetText}/> <br/>

                                                {this.viewTweetPicture(tweet.tweetPicture, tweet._id)}

                                                <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                                <div className="buttonGroup">
                                                <Icon.Group className="tweetResult" >
                                                    <Icon name='like'/> {tweet.likes.length} Like
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
                    </div>
                </InfiniteScroll>

                <ModalDelete
                    isOpen={this.state.modalDelete}
                    tweet={this.state.tweet}
                    isClose={this.closeModalDelete}
                />
            </FadeIn>
        );
    }
}

export default Tweet_Result;
