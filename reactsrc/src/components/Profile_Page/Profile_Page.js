import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import './Profile_Page.css';
import TwittContainer from "../Twitt_Container/Twitt_Container";
import UserAccountContainer from '../UserAccountContainer/UserAccountContainer'
import FadeIn from 'react-fade-in';
import ReactDOM from "react-dom";

const Timestamp = require('react-timestamp');

class Edit_Profile extends Component {

    constructor() {
        super();
        this.state = {
            userId: '',
            username: '',
            timestamp: '',
            email: '',
            phone: '',
            profilePicture: '',
            tweetCount: '',
            tweetItem: true,
            followingItem: false,
            followerItem: false
        };

        this.getTweetCounter = this.getTweetCounter.bind(this);
        this.handleItemClicked = this.handleItemClicked.bind(this);
    }

    componentWillMount() {
        this.getProfileData();
    }

    getTweetCounter(tweet) {
        this.setState({tweetCount: tweet});
    }

    getProfileData() {
        //Jika ia klik My Profile
        if (this.props.userId) {
            axios.get('/api/users/profile/'+ this.props.userId).then(res => {
                const user = res.data[0];
                this.setState({
                    username: user.username,
                    timestamp: user.timestamp,
                    email: user.email,
                    phone: user.phone,
                    profilePicture: user.profilePicture
                });
            });
            this.setState({userId: this.props.userId})
        }

        //Jika ia Klik DI container tweetnya
        else if (this.props.userIdProfile.userId) {
            axios.get('/api/users/profile/'+ this.props.userIdProfile.userId).then(res => {
                const user = res.data[0];
                this.setState({
                    username: user.username,
                    timestamp: user.timestamp,
                    email: user.email,
                    phone: user.phone,
                    profilePicture: user.profilePicture
                });
            });
            this.setState({userId: this.props.userIdProfile.userId})
        }
    }

    handleItemClicked(item) {

        if (item === "Follower") {
            //Render Validation box message
            ReactDOM.render(<FadeIn>
                <UserAccountContainer/>
            </FadeIn>, document.getElementById('profileInfo'));
        }
        else if (item === "Following") {
            //Render Validation box message
            ReactDOM.render(<FadeIn>
                <UserAccountContainer/>
            </FadeIn>, document.getElementById('profileInfo'));
        }
        else if (item === "Tweets") {
            //Render Validation box message
            ReactDOM.render(<FadeIn><TwittContainer TweetUserId={this.state.userId}
            userId={this.props.userId}
            tweetCounter={this.getTweetCounter}
            located="profile"
            /></FadeIn>, document.getElementById('profileInfo'));
        }
    }

    render() {

        let imageUrl = this.state.profilePicture;
        let imagedisplay

        if(imageUrl){
            imagedisplay = <img alt=" " src={require(`../../uploads/${imageUrl}`)} className="float-right" />
        }
        else{
            imagedisplay = <img alt=" " src={profile} />
        }

        console.log("PROFILE PAGE ", this.state);

        return (
            <FadeIn>
                <div className="profile">
                    <div id="detailProfile" className="ui card">
                        <div className="image" id="profilePicture">
                            {imagedisplay}
                        </div>
                        <div className="content">
                            <a className="header"><i className="user icon"/>{this.state.username}</a>
                            <div className="description">
                                <i className="calendar icon"/>Joined on <Timestamp time={this.state.timestamp}
                                format="date"/>
                            </div>
                            <div className="description">
                                <i className="envelope outline icon"/>
                                <a className="emailProfile" href="mailto:this.state.email">{this.state.email}</a>
                            </div>
                            <div className="description">
                                <i className="phone icon"/>{this.state.phone}
                            </div>
                        </div>
                    </div>

                    <div id="navDetail" className="ui three item menu">
                        <a className="item"
                           onClick={() => this.handleItemClicked("Tweets")}> Tweets <br/><br/>{this.state.tweetCount}
                        </a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Following")}>Following <br/><br/>15</a>
                        <a className="item"
                           onClick={() => this.handleItemClicked("Follower")}>Followers <br/><br/>15</a>
                    </div>

                    <FadeIn>
                        <div className="userProfile" id="profileInfo">
                            <TwittContainer TweetUserId={this.state.userId}
                            userId={this.props.userId}
                            tweetCounter={this.getTweetCounter}
                            located="profile"
                            />
                        </div>
                    </FadeIn>
                </div>
            </FadeIn>

        );
    }
}

export default Edit_Profile;
