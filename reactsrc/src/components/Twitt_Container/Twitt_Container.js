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
            tweetCounter: '',
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


    getTweetUser() {
        axios.get('/api/tweet/profiletweet/' + this.props.TweetUserId)
            .then(res => {
                this.setState({
                    tweetData: res.data,
                    tweetCounter: res.data.length
                });
                // get berapa banyak data tweet nya
                this.props.tweetCounter(res.data.length)
                // maksudnya dikirim ke profilepage, tweetCounter di profilepage
            });
    }

    getTweetData() {
        axios.get('/api/tweet/tweets')
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
            });
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
                                <h3>Sorry, We Didn't Find Something In Here :)</h3>
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

    render() {
        return (
            <FadeIn>
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
