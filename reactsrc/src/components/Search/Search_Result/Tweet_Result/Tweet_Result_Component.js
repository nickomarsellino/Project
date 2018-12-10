import React, {Component} from "react";
import axios from "axios/index";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import profile from '../../../../../src/daniel.jpg';
import ModalDelete from '../../../Modal/Modal_Delete/Modal_Delete';

import openSocket from "socket.io-client";

const Timestamp = require('react-timestamp');
const socket = openSocket('http://10.183.28.155:8000');
const Highlight = require('react-highlighter');

class Tweet_Result_Component extends Component {
    constructor() {
        super();
        this.state = {
            likes: null,
            resultData: [],
            black: "blackColor"
        };

        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
    }

    componentWillMount() {
        this.setState({
            resultData: this.props.resultData,
            likes: this.props.resultData.likes
        })
    }

    componentDidMount() {
        // Untuk Like
        socket.on(this.props.resultData._id + 'like', bebas => {
            this.setState({
                likes: this.state.likes.concat(bebas.userId)
            });
            this.likeIkonColor();
        });

        //  Untuk UNLIKE
        socket.on(this.props.resultData._id + "unlike", bebas => {
            let likeList = []
            for (var unlike in this.state.likes) {
                if (this.state.likes[unlike] !== bebas.userId) {
                    likeList.push(this.state.likes[unlike])
                }
            }
            this.setState({
                likes: likeList
            });
            this.likeIkonColor();
        });
        this.likeIkonColor();
        this.commentIkonColor();
    }

    commentIkonColor(){
        for(let i=0; i < this.props.resultData.comments.length; i++){
            if(this.props.resultData.comments[i].userId === localStorage.getItem("myThings")){
                this.setState({
                    commentColor: "blueColor"
                })
            }
        }
    }

    likeIkonColor() {
        if (this.state.likes === null) {
            if (this.props.tweet.likes.includes(this.props.userId)) {
                // IF yang ini, cek kondisi skrg, kalo [] mengadung, maka warna nya merah
                this.setState({
                    black: "redColor"
                })
            }
            else {
                this.setState({
                    black: "blackColor"
                })
            }
        }
        else {
            if (this.state.likes.includes(this.props.userId)) {
                // Ini cek state likes nya mengandung id dia ga atau ada ga id dia di sana?
                this.setState({
                    black: "redColor"
                })
            }
            else {
                this.setState({
                    black: "blackColor"
                })
            }
        }
    }

    setProfileImage(profilePicture, userId, username) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" "
                     src={require(`../../../../uploads/${imageUrl}`)}
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
                    <Image src={require(`../../../../tweetImage/${tweetPicture}`)}
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

    clickLikeButton(userId) {
        const likeData = {
            userId: this.props.userId,
            tweetId: this.props.resultData._id
        };
        console.log(this.props.userId);
        const tweetLikesLength = this.state.likes;
        const checkValidID = tweetLikesLength.includes(userId);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // Udabener ini
        if (checkValidID) {
            console.log('UNLIKE');
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/unlikeTweet/` + this.state.resultData._id,
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
        else {
            console.log('LIKE');
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/likeTweet/` + this.state.resultData._id,
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

    render() {
        console.log(this.props.searchValue);
        console.log(this.props.resultData.comments)
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

                                <Feed.Extra id="tweetText" text >
                                    <Highlight search={this.props.searchValue}>{this.state.resultData.tweetText}</Highlight>
                                </Feed.Extra> <br/>

                                {this.viewTweetPicture(this.state.resultData.tweetPicture, this.state.resultData._id)}

                                <Feed.Date content={<Timestamp time={this.state.resultData.timestamp} precision={1}/>}/>

                                <div className="buttonGroup">
                                    <Icon.Group className={this.state.black}
                                                id="likesIcon"
                                                onClick={() => this.clickLikeButton(this.props.userId, this.props.tweetId)}
                                    >
                                        <Icon name='like'/>
                                        {!this.state.likes ?
                                            this.state.resultData.likes.length + " Likes"
                                            :
                                            this.state.likes.length + " Likes"
                                        }
                                    </Icon.Group>
                                    <Icon.Group className={this.state.commentColor} id="commentsIcon">
                                        <Icon name='comments'/>
                                        {this.state.resultData.comments.length} Comments
                                    </Icon.Group>
                                </div>

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
