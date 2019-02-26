import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact";
import profile from '../../../daniel.jpg';
import {Comment, Icon} from 'semantic-ui-react';
import './Notification_Container.css'
import axios from 'axios';

//Load another component


class Notification_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        };
    }

    componentWillMount() {
        axios.get('/api/notification/getNotification')
            .then(res => {

            });
    }

    setProfileImage(profilePicture) {

        // let imageUrl = profilePicture;
        //
        // if (imageUrl) {
        //     return (
        //         <Comment.Avatar
        //             onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
        //             alt=" " src={require(`../../../uploads/${imageUrl}`)}
        //             className="RecomendationPicture"
        //         />
        //     );
        // }
        // else {
            return (
                <Comment.Avatar
                    onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                    alt=" " src={profile}
                    className="NotificationPicture"
                />
            );
        // }
    }

    viewUserProfile(username, userId) {
        if (localStorage.getItem("myThings") === userId) {
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

    render() {
        return (
            <FadeIn>
                <Container className="col-lg-6 col-lg-offset-6" style={{marginBottom: "5%", marginTop: "3%"}}>
                        <h2 id="titlePage">Your Notification</h2>
                        <hr/>

                    <center>

                        <div className="notificationBox">
                            <Comment.Group className="NotificationLikesComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Robert</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="likedNotification"
                                                  name='heart outline' /> Liked Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>2 Days Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationCommentsComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Tiara Vitaloka</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="commentsNotification"
                                                  name='edit outline' /> Commented Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>1 Minutes Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationFollowedComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Christian</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="followedNotification"
                                                  name='handshake outline' /> Started Following You.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>11 Seconds Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationCommentsComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Fernaldi</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="commentsNotification"
                                                  name='edit outline' /> Commented Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>1 Minutes Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationCommentsComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Yohandi</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="commentsNotification"
                                                  name='edit outline' /> Commented Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>1 Minutes Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationLikesComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Jessica Mila</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="likedNotification"
                                                  name='heart outline' /> Liked Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>2 Days Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationFollowedComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Jessica Mila</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="followedNotification"
                                                  name='handshake outline' /> Started Following You.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>11 Seconds Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationFollowedComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Magha</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="followedNotification"
                                                  name='handshake outline' /> Started Following You.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>11 Seconds Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationLikesComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Magha</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="likedNotification"
                                                  name='heart outline' /> Liked Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>2 Days Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                            <Comment.Group className="NotificationLikesComponent" style={{marginBottom: "6px", marginTop: "6px"}}>
                                <Comment className="NotificationGroup">
                                    {this.setProfileImage()}
                                    <Comment.Content className="NotificationUsername"
                                                     onClick={() => this.viewUserProfile(this.props.recomendation.username, this.props.recomendation._id)}
                                    >
                                        <Comment.Author>Kevin</Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationAction">
                                        <Comment.Author>
                                            <Icon flipped='horizontally'
                                                  id="likedNotification"
                                                  name='heart outline' /> Liked Your Post.
                                        </Comment.Author>
                                    </Comment.Content>

                                    <Comment.Content className="NotificationTimestamp">
                                        <Comment.Author>2 Days Ago.</Comment.Author>
                                    </Comment.Content>

                                </Comment>
                            </Comment.Group>

                        </div>

                    </center>

                </Container>
            </FadeIn>
        )
    }
}

export default Notification_Container;
