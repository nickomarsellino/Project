import React, {Component} from "react";
import {Comment, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import "./Comments_Container.css"

class Comments_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: '',
        };
    }

    render() {
        return (
            <Comment.Group size='small'>
                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={profile} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>

                    <Icon name='trash' id="trashIcon"/>
                </Comment>
                <hr/>

                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={profile} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>

                    <Icon name='trash' id="trashIcon"/>
                </Comment>
                <hr/>

                <Comment id="commentsContainer">
                    <Comment.Avatar as='a' src={profile} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>

                    <Icon name='trash' id="trashIcon"/>
                </Comment>
                <hr/>

            </Comment.Group>
        )
    }
}

export default Comments_Container;
