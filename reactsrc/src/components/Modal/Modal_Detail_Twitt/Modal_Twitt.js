import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';
import {Image, Icon} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import './Modal_Twitt.css';
import axios from 'axios';


//load another component
import CommentsBox from "../../Comments_Box/Comments_Box";
import CommentsContainer from "../../Comments_Container/Comments_Container";
import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');
const Timestamp = require('react-timestamp');


class Modal_Twitt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLoginId: '',
            tweet: [],
            checkLikes: false,
            black: 'blackColor',
            likes: this.props.likes,
            commentColor: "blueColor"
        };
        this.openModal = this.openModal.bind(this);
        this.likeIkonColor=this.likeIkonColor.bind(this);
    }

    componentDidMount(){
        this.setState({
            userLoginId: localStorage.getItem("myThings"),
            tweet: this.props.tweet,
            likes: this.props.tweet.likes
        })
        this.commentIkonColor();

        socket.on(this.props.tweet._id + 'like', bebas => {
            this.setState({
                likes: this.state.likes.concat(bebas.userId)
            });
            this.likeIkonColor();
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
        this.likeIkonColor();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tweet !== this.props.tweet) {
            this.setState({
                tweet: nextProps.tweet
            });
        }
    }

    clickLikeButton(userId) {
        const likeData = {
            userId: this.state.userLoginId,
            tweetId: this.props.tweet._id
        };

        const tweetLikesLength = this.state.likes;
        const checkValidID = tweetLikesLength.includes(userId);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // Udabener ini
        if (checkValidID) {
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/unlikeTweet/` + this.props.tweet._id,
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
            axios({
                method: 'PUT',
                responseType: 'json',
                url: `/api/tweet/likeTweet/` + this.props.tweet._id,
                data: likeData
            })
                .then(res => {
                    this.setState({
                        checkLikes: true,
                    });
                    socket.emit('sendLike', likeData)
                })
        }
    }

    commentIkonColor(){
        if(this.props.tweet.comments.length > 0 ){
            this.setState({
                commentColor: "blueColor"
            })
        }
        else{
            this.setState({
                commentColor: "blackColor"
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

    openModal() {
        //Akses Fungsi yang di Twitt_Container.js
        this.props.isClose(this.props.isOpen);
        this.setState({
            likes: this.props.likes
        })
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../../uploads/${imageUrl}`)} id="profilePictureTweet"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="profilePictureTweet"/>
            );
        }
    }

    viewTweetPicture(tweetPicture) {
        if (tweetPicture) {
            return (
                <center>
                    <Image src={require(`../../../tweetImage/${tweetPicture}`)}/>
                </center>
            );
        }
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.openModal}>
                    <ModalHeader toggle={this.openModal}>
                        <div className="profileBox">
                            <Image avatar id="avatarBox">
                                    {this.setProfileImage(this.state.tweet.profilePicture)}
                                    </Image>
                                <span><h5 id="nameBox">{this.state.tweet.username}</h5></span>
                        </div>
                    </ModalHeader>

                    <ModalBody className="text-warp">
                        <h5>{this.state.tweet.tweetText}</h5>
                        {this.viewTweetPicture(this.state.tweet.tweetPicture)}
                    </ModalBody>

                    <ModalBody className="text-Timestamp">
                        <Timestamp time={this.state.tweet.timestamp} format='full' includeDay/>

                        <div className="buttonGroup">
                            <Icon.Group className={this.state.black} id="likesIcon" onClick={() => this.clickLikeButton(this.state.userLoginId, this.props.tweetId)}
                            >
                              <Icon name='like'/>
                              {!this.props.likes ?
                                this.props.tweet.likes.length + " Likes"
                                :
                                this.state.likes.length + " Likes"
                              }
                            </Icon.Group>
                            <Icon.Group  className={this.state.commentColor} id="commentsIcon">
                                <Icon name='comments'/>{this.props.tweet.comments.length} Comments
                            </Icon.Group>
                        </div>
                        <hr/>

                        <div className="commentBox">
                            <CommentsBox
                                profilePicture={this.props.profilePicture}
                                userId={this.props.userId}
                                username={this.props.username}
                                tweet={this.props.tweet}
                            />
                            <CommentsContainer/>
                        </div>

                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}


export default Modal_Twitt;
