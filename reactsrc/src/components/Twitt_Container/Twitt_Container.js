import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';


//load another component
import ModalTwitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../Modal/Modal_Delete/Modal_Delete';

const Timestamp = require('react-timestamp');


class Twitt_Container extends Component {

    constructor() {
        super();
        this.state = {
            tweetData: [],
            tweet: [],
            modalTweet: false,
            modalDelete: false
        };

        this.getTweetData = this.getTweetData.bind(this);
        this.getTweetUser = this.getTweetUser.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalTweet = this.closeModalTweet.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
    }

    componentWillMount() {
        if (this.props.TweetUserId) {
            this.getTweetUser();
        }
        else {
            this.getTweetData();
        }
    }

    viewUserProfile(username, userId) {
        if (this.props.located === "home") {
            return (
                <Link to={{
                    pathname: `/home/profile/${username}`,
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

        else if (this.props.located === "profile") {
            return (
                    <div>
                        <Feed.Summary content={username}/>
                    </div>
            );
        }
    }

    getTweetUser() {
        axios.get('/api/users/profiletweet/' + this.props.TweetUserId)
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
                this.props.tweetCounter(res.data.length)
            });
    }

    getTweetData() {
        axios.get('/api/users/tweets')
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
            });
    }

    openModalTweet(tweetId) {
        axios.get('/api/users/tweet/' + tweetId)
            .then(res => {
                this.setState({
                    tweet: res.data,
                    modalTweet: true
                });
            });
    }

    openModalDelete(tweetId) {
        axios.get('/api/users/tweet/' + tweetId)
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

    render() {
        return (
            <FadeIn>
                <div>
                    {this.state.tweetData.map(tweet =>
                        <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                            <CardBody className="Tweet">
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label image={profile} style={{width: "10%", padding: "5px 0"}}/>
                                        <Feed.Content className="Tweet-Content"
                                                      onClick={() => this.openModalTweet(tweet._id)}>

                                            {this.viewUserProfile(tweet.username, tweet.userId)}

                                            <Feed.Extra id="tweetText" text content={tweet.tweetText}/> <br/>

                                            <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                            <div>
                                                <Icon.Group>
                                                     <Icon
                                                    name='comments'
                                                    id="commentsIcon">{' '}9</Icon>
                                                </Icon.Group>
                                                <Icon.Group>
                                                    <Icon
                                                        name='like'
                                                        id="likeIcon">{' '}10</Icon>
                                                </Icon.Group>
                                                <Icon.Group>
                                                    11 <Icon name='sync alternate' />
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
                    />

                    <ModalDelete
                        isOpen={this.state.modalDelete}
                        tweet={this.state.tweet}
                        isClose={this.closeModalDelete}
                    />

                </div>
            </FadeIn>
        );
    }
}

export default Twitt_Container;
