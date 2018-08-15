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
        if(this.props.TweetUserId){
            this.getTweetUser();
        }
        else {
            this.getTweetData();
        }
    }

    getTweetUser() {
        axios.get('/api/users/profiletweet/'+this.props.TweetUserId)
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
                                    <Feed.Label image={profile} style={{width: "10%", padding: "5px 0"}} href={'home/profile/Lil%20Uzi%20Vert'}/>
                                    <Feed.Content className="Tweet-Content" onClick={() => this.openModalTweet(tweet._id)}>

                                        <Link to={{
                                            pathname: `/home/profile/${tweet.username}`,
                                            state: {
                                                userId: tweet.userId
                                            }
                                        }}>
                                            <div>
                                                <Feed.Summary content={tweet.username}/>
                                            </div>
                                        </Link>

                                        <Feed.Extra id="tweetText" text content={tweet.tweetText}/> <br/>

                                        <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>} />
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
