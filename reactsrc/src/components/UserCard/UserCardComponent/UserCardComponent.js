import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserCardComponent.css';
import profile from '../../../daniel.jpg';
import equal from "fast-deep-equal";

class UserCardComponent extends Component {

    constructor() {
        super();
        this.state = {
            hasilGet: '',
            userIdFollow: [],
            userData: [],
            isFollow: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButton"
        };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.followButton = this.followButton.bind(this);
    }

    componentDidMount() {
        if (this.props.located === "inSearchPage") {
            this.setState({
                userData: this.props.userData
            });
            // //Check apakah user tersebut memfollow yang sedang login
            axios.get('/api/users/profile/' + localStorage.getItem("myThings")).then(res => {
                const user = res.data[0];
                if (user.following.includes(this.props.userData._id)) {
                    this.setState({
                        isFollow: true,
                        buttonFollowText: "Followed",
                        butttonFollowCondition: "followedButton"
                    });
                }
            });
        }
        else {
            this.getSpecificFollowingUser();
        }
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.located === "inSearchPage") {
            this.setState({
                userData: nextProps.userData
            });
            // //Check apakah user tersebut memfollow yang sedang login
            axios.get('/api/users/profile/' + localStorage.getItem("myThings")).then(res => {
                const user = res.data[0];
                if (user.following.includes(nextProps.userData._id)) {
                    this.setState({
                        isFollow: true,
                        buttonFollowText: "Followed",
                        butttonFollowCondition: "followedButton"
                    });
                }
            });
        }
        else {
            this.getSpecificFollowingUser();
        }
    }


    getSpecificFollowingUser() {
        axios.get('/api/users/profile/' + this.props.userData)
            .then(res => {
                this.setState({
                    userData: res.data[0]
                });
            });

        //Check apakah user tersebut memfollow yang sedang login
        if (this.props.userLoginFollowingData.includes(this.props.userData)) {
            this.setState({
                isFollow: true,
                buttonFollowText: "Followed",
                butttonFollowCondition: "followedButton"
            });
        }
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " id="ProfileImage" src={require(`../../../uploads/${imageUrl}`)} className="float-right"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile} id="ProfileImage"/>
            );
        }
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


    mouseEnter() {
        if (this.state.isFollow) {
            this.setState({buttonFollowText: "Unfollow"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }

    }

    mouseLeave() {
        if (this.state.isFollow) {
            this.setState({buttonFollowText: "Followed"})
        }
        else {
            this.setState({buttonFollowText: "Follow"})
        }
    }

    onButtonClicked(userId) {
        this.setState({isFollow: !this.state.isFollow});

        if (this.state.isFollow) {
            axios.put('/api/users/unfollow/' + userId).then(res => {
                this.setState({butttonFollowCondition: "followButton"})
            });
        }
        else {
            axios.put('/api/users/follow/' + userId).then(res => {
                this.setState({butttonFollowCondition: "followedButton"})
            });
        }
    }


    followButton(username, userId) {

        if (userId !== localStorage.getItem("myThings")) {
            return (
                <div
                    id={this.state.butttonFollowCondition}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    onClick={() => this.onButtonClicked(userId)}
                >
                    <center>
                        <Icon
                            size='large'
                            name='handshake'
                            id='iconFollow'
                        />
                        {' '}{this.state.buttonFollowText}
                    </center>
                </div>
            );
        }
        else {
            return (
                <div
                    id={this.state.butttonFollowCondition}
                    onClick={() => this.viewUserProfile(username , userId)}>
                    <center>
                        <Icon
                            size='large'
                            name='user circle'
                            id='iconFollow'
                        />
                        {' '} My Profile
                    </center>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="col-lg-3 col-lg-offset-4 user-Container" key={this.state.userData._id}>
                <Card>
                    <center>
                        <Image style={{margin: "20px"}}
                               onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}>
                            {this.setProfileImage(this.state.userData.profilePicture)}
                        </Image>
                    </center>
                    <Card.Content>
                        <center>
                            <Card.Header className="profileName"
                                         onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}>
                                {this.state.userData.username}
                            </Card.Header>

                            {this.followButton(this.state.userData.username, this.state.userData._id)}

                        </center>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default UserCardComponent;
