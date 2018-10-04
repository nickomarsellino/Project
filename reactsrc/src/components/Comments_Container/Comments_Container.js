import React, {Component} from "react";
import {Comment, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import "./Comments_Container.css"

const Timestamp = require('react-timestamp');

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: this.props.tweet.comments,
        };
    }

    buttonDeleteComment(id, userId){
        if(localStorage.getItem("myThings") === userId){
            return(
                <Icon name='trash' id="trashIcon"/>
            );
        }
    }

    render() {
      console.log(this.state.commentData);
        return (
          <Comment.Group size='small'>
              {this.state.commentData.map(comment =>
                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={comment.profilePicture} id="commentAvatar"/>
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
