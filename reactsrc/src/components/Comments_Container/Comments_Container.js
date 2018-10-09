import React, {Component} from "react";
import {Comment, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import "./Comments_Container.css"
import axios from "axios/index";
import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.153:8000');
const Timestamp = require('react-timestamp');

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: [],
            commentList: []
        };
    }

    componentDidMount(){
        this.getAllComment();
        socket.on('getComment', bebasnamavariabel => {
            const allComment = this.state.commentData;
            const newComment = [bebasnamavariabel].concat(allComment);
            this.setState({
                commentData: newComment
            })
        })

        socket.on('getNewComment', bebasnamavariabel => {

        })

    }

    getAllComment(){
        axios.get('/api/tweet/getComment/' + this.props.tweet._id)
        .then(res => {
            this.setState({
                commentData: res.data.comments
            })
            console.log(this.state.commentData);
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
            url: `api/tweet/deleteCommentTweet/` + this.props.tweet._id,
            data: idComment
        })
        socket.emit('deleteComment', idComment)
        alert("Berhasil delete...!");
    }

    render() {
      console.log(this.state.commentData);
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
