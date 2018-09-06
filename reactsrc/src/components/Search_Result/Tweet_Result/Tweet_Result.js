import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
import profile from '../../../../src/daniel.jpg';
import axios from 'axios';
import './Tweet_Result.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import ModalDelete from '../../Modal/Modal_Delete/Modal_Delete';

const Timestamp = require('react-timestamp');


class Tweet_Result extends Component {

    constructor() {
        super();
        this.state = {
            tweetResults: [],
            tweet:[],
            modalDelete: false
        };

        this.getTweetSearch = this.getTweetSearch.bind(this);
        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
    }

    componentWillMount() {
        this.getTweetSearch();
    }

    viewUserProfile(username, userId) {
        if (window.location.href === "http://localhost:3001/home/search/?"+this.props.searchValue) {
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
    }

    getTweetSearch() {
        this.setState({
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

    onClickedImage(userId, username){
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

    render() {
        return (
            <FadeIn>
                <div style={{marginTop: "2%"}}>
                    {this.state.tweetResults.map(tweet =>
                        <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                            <CardBody className="Tweet">
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                            {this.setProfileImage(tweet.profilePicture, tweet.userId, tweet.username)}
                                        </Feed.Label>
                                        <Feed.Content className="Tweet-Content">

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
                </div>

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
