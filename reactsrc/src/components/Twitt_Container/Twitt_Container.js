    import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
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
            //Jika id di container sam dengan yang login sekarang akan ke page "My Profile"
            if(userId === this.props.userId){
                return (
                    <Link to={{
                        pathname: `/home/myProfile/${username}`,
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
                // get berapa banyak data tweet nya
                this.props.tweetCounter(res.data.length)
                // maksudnya dikirim ke profilepage, tweetCounter di profilepage
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

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../uploads/${imageUrl}`)} id="profilePictureTweet"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="profilePictureTweet"/>
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

                                        <Feed.Label style={{width: "56px", padding: "5px 0"}}>
                                            {this.setProfileImage(tweet.profilePicture)}
                                        </Feed.Label>
                                        <Feed.Content className="Tweet-Content"
                                                      onClick={() => this.openModalTweet(tweet._id)}>

                                            {this.viewUserProfile(tweet.username, tweet.userId)}

                                            <Feed.Extra id="tweetText" text content={tweet.tweetText}/> <br/>

                                            <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                            <div>
                                                <Icon.Group>
                                                    9 <Icon name='comments' id="commentsIcon"/>
                                                </Icon.Group>
                                                <Icon.Group>
                                                    10 <Icon name='like' id="likeIcon"/>
                                                </Icon.Group>
                                                <Icon.Group>
                                                    11 <Icon name='sync alternate'/>
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
