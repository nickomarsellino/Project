import React, {Component} from "react";
import {Comment} from 'semantic-ui-react'
import profile from '../../daniel.jpg';

const Timestamp = require('react-timestamp');

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: this.props.tweet.comments,
        };
    }

    render() {
      console.log(this.state.commentData);
        return (
          <div>
              {this.state.commentData.map(comment =>
                <Comment.Group size='small'>
                    <Comment id="commentsContainer">
                        <Comment.Avatar as='a' src={comment.profilePicture}/>
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.username}</Comment.Author>
                            <Comment.Metadata>
                                <span>{<Timestamp time={comment.commentTimestamp} format='full'/>}</span>
                            </Comment.Metadata>
                            <Comment.Text>{comment.commentText}</Comment.Text>
                        </Comment.Content>
                    </Comment><br/>
                </Comment.Group>
              )}
          </div>
        )
    }
}

export default Comments_Container;
