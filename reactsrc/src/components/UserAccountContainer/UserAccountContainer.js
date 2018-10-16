import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserAccountContainer.css';
import profile from '../../daniel.jpg';

import UserAccountComponent from '../UserAccountComponent/UserAccountComponent'

class UserAccountContainer extends Component {

    constructor() {
        super();
        this.state = {
            userData: [],
            isFollow: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButton"
        };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    componentWillMount() {

        if(this.props.userSearch){
            this.setState({
                userData: this.props.userSearch
            });
        }
        else {
            axios.get('/api/users/allUsers/')
                .then(res => {
                    this.setState({
                        userData: res.data
                    });
                });
        }

    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " id="ProfileImage" src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="ProfileImage"/>
            );
        }
    }

    viewUserProfile(username, userId) {
        if(localStorage.getItem("myThings") === userId){
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

    mouseEnter() {
        if(this.state.isFollow){
            this.setState({buttonFollowText: "Unfollow"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }

    }

    mouseLeave() {
        if(this.state.isFollow){
            this.setState({buttonFollowText: "Followed"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }
    }

    onButtonClicked(){
        this.setState({ isFollow: !this.state.isFollow });

        if(this.state.isFollow){
            this.setState({ butttonFollowCondition: "followButton"})
        }
        else{
            this.setState({ butttonFollowCondition: "followedButton"})
        }
    }

    render() {
        return (
            <div className="peopleCards">
                {this.state.userData.map(user =>

                    <UserAccountComponent
                        userData = {user}
                        history = {this.props.history}
                    />
                )}
            </div>
        );
    }
}

export default UserAccountContainer;
