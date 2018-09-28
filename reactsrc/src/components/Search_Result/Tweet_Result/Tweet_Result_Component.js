import React, {Component} from "react";
import axios from "axios/index";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import profile from '../../../../src/daniel.jpg';
import ModalDelete from '../../Modal/Modal_Delete/Modal_Delete';

const Timestamp = require('react-timestamp');

class Tweet_Result_Component extends Component {
    constructor() {
        super();
        this.state = {
            resultData: [],
        };

        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
    }

    componentWillMount() {
        this.setState({
            resultData: this.props.resultData,
        })
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

    likeIcon(likes) {
        if (likes.length === 0) {
            return (
                <div className="buttonGroup">
                    <Icon.Group className="blackColor"
                                id="likesIcon"
                        //onClick={() => this.clickLikeButton(this.props.userId, this.props.tweetId)}
                    >
                        <Icon name='like'/>{likes.length}{" "}Likes

                    </Icon.Group>
                    <Icon.Group className="commentsIcon">
                        {" "}<Icon name='comments'/> {" "} 0 Comments
                    </Icon.Group>
                </div>
            );
        }
        else {
            if (likes.includes(this.props.userId)) {
                return (
                    <div className="buttonGroup">
                        <Icon.Group className="redColor"
                                    id="likesIcon"
                            //onClick={() => this.clickLikeButton(this.props.userId, this.props.tweetId)}
                        >
                            <Icon name='like'/>{likes.length}{" "}Likes

                        </Icon.Group>
                        <Icon.Group className="commentsIcon">
                            {" "}<Icon name='comments'/> {" "} 0 Comments
                        </Icon.Group>
                    </div>
                );
            }
            else {
                return (
                    <div className="buttonGroup">
                        <Icon.Group className="blackColor"
                                    id="likesIcon"
                            //onClick={() => this.clickLikeButton(this.props.userId, this.props.tweetId)}
                        >
                            <Icon name='like'/>{likes.length}{" "}Likes

                        </Icon.Group>
                        <Icon.Group className="commentsIcon">
                            {" "}<Icon name='comments'/> {" "} 0 Comments
                        </Icon.Group>
                    </div>
                );
            }
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

    render() {
        return (
            <Card className="Tweet_Result" id="text-warp" key={this.state.resultData._id}>
                <CardBody className="Tweet">
                    <Feed>
                        <Feed.Event>
                            <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                {this.setProfileImage(this.state.resultData.profilePicture, this.state.resultData.userId, this.state.resultData.username)}
                            </Feed.Label>
                            <Feed.Content className="Tweet-Content">

                                {this.viewUserProfile(this.state.resultData.username, this.state.resultData.userId)}

                                <Feed.Extra id="tweetText" text content={this.state.resultData.tweetText}/> <br/>

                                {this.viewTweetPicture(this.state.resultData.tweetPicture, this.state.resultData._id)}

                                <Feed.Date content={<Timestamp time={this.state.resultData.timestamp} precision={1}/>}/>

                                {this.likeIcon(this.state.resultData.likes)}

                            </Feed.Content>

                            <Feed.Label className="Tweet-Delete">
                                {this.buttonDelete(this.state.resultData.userId, this.state.resultData._id)}
                            </Feed.Label>

                        </Feed.Event>
                    </Feed>
                </CardBody>

                <ModalDelete
                    isOpen={this.state.modalDelete}
                    tweet={this.state.tweet}
                    isClose={this.closeModalDelete}
                />

            </Card>
        );
    }
}

export default Tweet_Result_Component;