import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import axios from 'axios';
import './TweetComponent.css';


//load another component
import ModalTwitt from '../../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../../Modal/Modal_Delete/Modal_Delete';

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');

const Timestamp = require('react-timestamp');

class TweetComponent extends Component {

    constructor() {
        super();
        this.state = {
            likes: null,
            comments: null,
            tweet: [],
            tweetCounter: '',
            userId: '',
            likeId: '',
            modalTweet: false,
            modalDelete: false,
            checkLikes: false,
            black: "blackColor",
            commentColor: ""
        };
        this.openModalDelete = this.openModalDelete.bind(this);
        this.setProfileImage = this.setProfileImage.bind(this);
        this.viewUserProfile = this.viewUserProfile.bind(this);
        this.buttonDelete = this.buttonDelete.bind(this);
        this.openModalTweet = this.openModalTweet.bind(this);
        this.closeModalTweet = this.closeModalTweet.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.onClickedImage = this.onClickedImage.bind(this);
    }


    componentWillMount() {
        this.setState({
            tweet: this.props.tweet,
            likes: this.props.tweet.likes,
            comments: this.props.tweet.comments.length
        })

        this.getAllComment();
        this.likeIkonColor();

        // Untuk Like
        socket.on(this.props.tweet._id + 'like', bebas => {
            this.setState({
                likes: this.state.likes.concat(bebas.userId)
            });
            this.likeIkonColor();
        });

        //Untuk Comments
        socket.on(this.props.tweet._id + 'getCommentLength', bebas => {
            const comments = this.state.comments + 1;
            this.setState({
                comments: comments
            });
        });


        //  Untuk UNLIKE
        socket.on(this.props.tweet._id + "unlike", bebas => {
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


        //Untuk UnComments
        socket.on(this.props.tweet._id + 'deleteCommentLength', bebas => {
            const comments = this.state.comments - 1;
            this.setState({
                comments: comments
            });
        });
    }

    onClickedImage(userId, username) {

        if (this.props.located === "profile") {

        }
        else {
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

    viewUserProfile(username, userId) {

        if (this.props.located === "home") {
            //Jika id di container sam dengan yang login sekarang akan ke page "My Profile"
            if (userId === this.props.userId) {
                return (
                    <Feed.Summary content={username}
                                  onClick={() => this.onClickedImage(userId, username)}/>
                );
            }
            else {
                return (
                    <Feed.Summary content={username}
                                  onClick={() => this.onClickedImage(userId, username)}/>
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

    viewTweetPicture(tweetPicture, userId) {
        const name = this.props.tweet.username.replace(' ', '');

        if (window.location.href === "http://localhost:3001/home/profile/"+name) {
            if (tweetPicture) {
                return (
                    <center>
                        <Image src={require(`../../../../src/tweetImage/${tweetPicture}`)}
                               id="tweetImage"
                               onClick={() => this.openModalTweet(userId)}
                        />
                    </center>
                );
            }
        }

        else if (window.location.href === "http://localhost:3001/home/myProfile/"+name){
            if (tweetPicture) {
                return (
                    <center>
                        <Image src={require(`../../../../src/tweetImage/${tweetPicture}`)}
                               id="tweetImage"
                               onClick={() => this.openModalTweet(userId)}
                        />
                    </center>
                );
            }
        }
        else {
            if (tweetPicture) {
                return (
                    <Image src={require(`../../../../src/tweetImage/${tweetPicture}`)}
                           fluid
                           style={{marginBottom: "20px", cursor: "pointer"}}
                           onClick={() => this.openModalTweet(userId)}
                    />
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

    clickLikeButton(userId) {
        const likeData = {
            userId: this.props.userId,
            tweetId: this.props.tweet._id
        };
        const tweetLikesLength = this.state.likes;
        const checkValidID = tweetLikesLength.includes(userId);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // Udabener ini
        if (checkValidID) {
            console.log("1111");
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/unlikeTweet/` + this.state.tweet._id,
                data: likeData
            })
                .then(res => {
                    this.setState({
                        checkLikes: false,
                    });
                    socket.emit('unlike', likeData)
                })
        }
        else {
            console.log("222222");
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/likeTweet/` + this.state.tweet._id,
                data: likeData
            })
                .then(res => {
                    // if(this.props.isHome){
                    //     this.props.getTweetData();
                    // }
                    // else if(this.props.isProfile){
                    //     if(this.props.tweetUserId){
                    //         this.props.showUserProfileFromTweets(this.props.tweetUserId)
                    //     }
                    // }
                    this.setState({
                        checkLikes: true,
                    });
                    socket.emit('sendLike', likeData)
                })
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

    getAllComment(){
        axios.get('/api/tweet/getComment/' + this.props.tweet._id)
            .then(res => {
                this.setState({
                    commentLength: res.data.comments.length
                })
            })
    }

    render() {
        console.log("Di TW COMPONEN: ", this.props.tweet);
        const tweet = this.props.tweet;
        return (
            <div id="scrollableDiv" style={{overflow: "auto"}}>
                <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                    <CardBody className="Tweet">
                        <Feed>
                            <Feed.Event>
                                <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                    {this.setProfileImage(tweet.profilePicture, tweet.userId, tweet.username)}

                                </Feed.Label>
                                <Feed.Content className="Tweet-Content">

                                    {this.viewUserProfile(tweet.username, tweet.userId)}

                                    <Feed.Extra onClick={() => this.openModalTweet(tweet._id)} id="tweetText" text
                                                content={tweet.tweetText}/> <br/>

                                    {this.viewTweetPicture(tweet.tweetPicture, tweet._id)}

                                    <Feed.Date onClick={() => this.openModalTweet(tweet._id)} id="tweetText"
                                               content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                    <div className="buttonGroup">
                                        <Icon.Group className={this.state.black}
                                                    id="likesIcon"
                                                    onClick={() => this.clickLikeButton(this.props.userId, this.props.tweetId)}
                                        >
                                            <Icon name='like'/>
                                            {this.props.tweet.likes.length} Likes
                                        </Icon.Group>
                                        <Icon.Group className={this.state.commentColor} onClick={() => this.openModalTweet(tweet._id)} id="commentsIcon">
                                            <Icon name='comments'/>
                                            {!this.state.comments ?
                                                tweet.comments.length + " Comments"
                                                :
                                                this.state.comments + " Comments"
                                            }

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
                <ModalTwitt
                    isOpen={this.state.modalTweet}
                    tweet={this.props.tweet}
                    likes={this.state.likes}
                    isClose={this.closeModalTweet}
                    userId={this.props.userId}
                    profilePicture={this.props.profilePicture}
                    username={this.props.username}
                    getTweetData={this.props.getTweetData}
                    showUserProfileFromTweets={this.props.showUserProfileFromTweets}
                    isHome={this.props.isHome}
                    isProfile={this.props.isProfile}
                />

                <ModalDelete
                    isOpen={this.state.modalDelete}
                    tweet={this.state.tweet}
                    isClose={this.closeModalDelete}
                />
            </div>
        );
    }
}

export default TweetComponent;
