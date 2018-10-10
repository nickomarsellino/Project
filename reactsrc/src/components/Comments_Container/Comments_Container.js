import React, {Component} from "react";
import {Comment, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import "./Comments_Container.css"
import axios from "axios/index";
import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.155:8000');
const Timestamp = require('react-timestamp');

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: [],
            commentId:''
        };
    }

    componentDidMount(){
        this.getAllComment();
        socket.on('getComment', bebasnamavariabel => {
            const allComment = this.state.commentData;
            const newComment = [bebasnamavariabel].concat(allComment);
            this.setState({
                commentData: newComment
            });
            console.log(this.state.commentId);
        });

        socket.on("deleteComment", bebasnamavariabel => {
            let newCommentList = [];
            for( var deleteComment in this.state.commentData){
                if(this.state.commentData[deleteComment]._id !== this.state.commentId._id){
                    newCommentList.push(this.state.commentData[deleteComment])
                }
            }
            this.setState({
                commentData: newCommentList
            });
        });

    }

    getAllComment(){
        axios.get('/api/tweet/getComment/' + this.props.tweet._id)
        .then(res => {
            this.setState({
                commentData: res.data.comments
            })
        })
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;
        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../../src/uploads/${imageUrl}`)} />
            );
        }
        else {
            return (
                <img alt=" " src={profile} />
            );
        }
    }

    showButtonDeleteComment(commentId, userId){
        if(localStorage.getItem("myThings") === userId){
            return(
                <Icon name='trash' id="trashIcon" onClick={() => this.deleteComment(commentId)}/>
            );
        }
    }

    deleteComment(commentId){
        const idComment = {
           _id: commentId
        };
        axios({
            method: 'PUT',
            responseType: 'json',
            url: `http://localhost:3001/api/tweet/deleteCommentTweet/` + this.props.tweet._id,
            data: idComment
        })
        this.setState({
            commentId : idComment
        })
        socket.emit('deleteComment', idComment)

        if(this.props.isHome){
            this.props.getTweetData();
        }
        else if(this.props.isProfile){
            this.props.showUserProfileFromTweets(localStorage.getItem("myThings"));
        }
        // this.props.getTweetData();
        // this.props.showUserProfileFromTweets(localStorage.getItem("myThings"));
        // alert("Berhasil delete...!");
    }

    render() {
        return (
          <Comment.Group size='small'>
              {this.state.commentData.map(comment =>
                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={this.setProfileImage(comment.profilePicture)} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                        <Comment.Metadata>
                            <span>{<Timestamp time={comment.commentTimestamp} format='full'/>}</span>
                        </Comment.Metadata>
                         <Comment.Text>{comment.commentText}</Comment.Text>
                    </Comment.Content>

                    {this.showButtonDeleteComment(comment._id, comment.userId)}

                    <hr/>
                </Comment>
              )}
          </Comment.Group>
        );
    }
}

export default Comments_Container;
