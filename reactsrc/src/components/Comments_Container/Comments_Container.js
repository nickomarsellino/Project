import React, {Component} from "react";
import {Comment} from 'semantic-ui-react'


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
                <Comment>
                    <Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}

export default Comments_Container;