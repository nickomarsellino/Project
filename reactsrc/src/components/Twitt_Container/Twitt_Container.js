import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';

//load another component
import Modal_Twitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import Modal_Delete from '../Modal/Modal_Delete/Modal_Delete';

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

        this.getData = this.getData.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalTweet = this.closeModalTweet.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        axios.get('/api/users/tweets')
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
                console.log("tweetData ", this.state.tweetData);
            });
    }

    openModalTweet(tweetId) {
        axios.get('http://localhost:3000/api/users/tweet/' + tweetId)
            .then(res => {
                this.setState({
                    tweet: res.data,
                    modalTweet: true
                });
            });
    }

    openModalDelete(tweetId) {
        axios.get('http://localhost:3000/api/users/tweet/' + tweetId)
            .then(res => {
                this.setState({
                    tweet: res.data,
                    modalDelete: true
                });
            });
    }

    closeModalTweet(isOpen) {
        if (isOpen) {
            {
                this.setState({
                    modalTweet: false
                })
            }
        }
    }

    closeModalDelete(isOpen) {
        if (isOpen) {
            {
                this.setState({
                    modalDelete: false
                })
            }
        }
    }

    buttonDelete(userId, tweetId) {
        if (userId == this.props.userId) {
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
            <div>
                {this.state.tweetData.map(tweet =>
                    <Card className="Tweet_Container">
                        <CardBody className="Tweet">
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={profile} style={{width: "10%", padding: "5px 0"}}/>
                                    <Feed.Content onClick={() => this.openModalTweet(tweet._id)}>
                                        <div className="Tweet-Content">
                                            <Feed.Summary content={tweet.username}/>
                                        </div>
                                        <Feed.Extra text content={tweet.tweetText}/> <br/>
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

                <Modal_Twitt
                    isOpen={this.state.modalTweet}
                    tweet={this.state.tweet}
                    isClose={this.closeModalTweet}
                />

                <Modal_Delete
                    isOpen={this.state.modalDelete}
                    tweet={this.state.tweet}
                    isClose={this.closeModalDelete}
                />

            </div>
        );
    }
}

export default Twitt_Container;
