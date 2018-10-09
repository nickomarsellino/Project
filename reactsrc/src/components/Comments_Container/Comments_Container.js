import React, {Component} from "react";
import {Comment, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import "./Comments_Container.css"
import axios from "axios/index";

const Timestamp = require('react-timestamp');

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: this.props.tweet.comments
        };
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

    buttonDeleteComment(commentId, userId){
        if(localStorage.getItem("myThings") === userId){
            return(
                <Icon name='trash' id="trashIcon" onClick={() => this.deleteComment(commentId)}/>
            );
        }
    }

    deleteComment(commentId){
        const  id = {
           _id: commentId
        };
        axios({
            method: 'PUT',
            responseType: 'json',
            url: `api/tweet/deleteCommentTweet/` + this.props.tweet._id,
            data: id
        })
        alert("Berhasil delete...!");
    }

    render() {
      console.log(this.props.tweet);
        return (
          <Comment.Group size='small'>
              {this.state.commentData.slice(0).reverse().map(comment =>
                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={this.setProfileImage(comment.profilePicture)} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                        <Comment.Metadata>
                            <span>{<Timestamp time={comment.commentTimestamp} format='full'/>}</span>
                        </Comment.Metadata>
                         <Comment.Text>{comment.commentText}</Comment.Text>
                    </Comment.Content>

                    {this.buttonDeleteComment(comment._id, comment.userId)}

                    <hr/>
                </Comment>
              )}
          </Comment.Group>
        )
    }
}

export default Comments_Container;
