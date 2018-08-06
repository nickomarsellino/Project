import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import './Profile_Page.css';
import TwittContainer from "../Twitt_Container/Twitt_Container";
import {Icon} from 'semantic-ui-react';
const Timestamp = require('react-timestamp');

class Edit_Profile extends Component {

  constructor() {
      super();
      this.state = {
          username: '',
          timestamp: '',
          email   : '',
          phone   : '',
          tweetData: []
      };
  }

  componentWillMount() {
      this.getProfileData();
  }

  getProfileData() {
    // console.log(this.props.userId);
    axios.get('/api/users/').then(res => {
      this.setState({
          username: res.data.username,
          timestamp: res.data.timestamp,
          email   : res.data.email,
          phone   : res.data.phone
      });
    });
  }

  buttonDelete(userId, tweetId) {
      if (userId === this.props.userId) {
          return (
              <Icon
                  size='large' name='trash'
                  id="recycleIcon"
                  onClick={() => this.openModalDelete(tweetId)}
              />
          );
      }
  }


  render() {
    return (
      <div className="profile">
          <div id="detailProfile" className="ui card">
            <div className="image">
              <img className="profilePic" src={profile} alt=""/>
            </div>
            <div className="content">
              <a className="header"><i class="user icon"></i>{this.state.username}</a>
              <div className="description">
                <i class="calendar icon"></i>Joined on <Timestamp time={this.state.timestamp} format="date" />
              </div>
              <div className="description">
                <i class="envelope outline icon"></i>
                <a className="emailProfile" href="mailto:this.state.email">{this.state.email}</a>
              </div>
              <div className="description">
                <i class="phone icon"></i>{this.state.phone}
              </div>
            </div>
          </div>

              <div id="navDetail" className="ui three item menu">
                  <a class="item">Tweets</a>
                  <a class="item">Following</a>
                  <a class="item">Followers</a>
              </div>

              <div className="userTweet">
                  <TwittContainer TweetUserId={this.props.userId} userId={this.props.userId}/>
              </div>

          </div>

    );
  }
}

export default Edit_Profile;
