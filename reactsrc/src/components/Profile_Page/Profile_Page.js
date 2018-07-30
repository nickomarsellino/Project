import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import ReactDOM from "react-dom";
import './Profile_Page.css';
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
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
      this.getTweetData();
  }

  getProfileData() {
    // console.log(this.props.userId);
    axios.get('/api/users/' + this.props.userId).then(res => {
      this.setState({
          username: res.data.username,
          timestamp: res.data.timestamp,
          email   : res.data.email,
          phone   : res.data.phone
      });
      console.log("responseprofilpagedata: ", res.data);
      console.log("statenya: ", this.state);
    });
  }

  buttonDelete(userId, tweetId) {
      if (userId == this.props.userId) {
          return (
              <Icon
                  size='large' name='trash'
                  id="recycleIcon"
                  onClick={() => this.openModalDelete(tweetId)}
              />
          );
      }
  }

  getTweetData() {
      axios.get('/api/users/profiletweet/'+this.props.userId)
          .then(res => {
              this.setState({
                  tweetData: res.data
              });
              console.log("tweetData ", this.state.tweetData);
          });
  }

  render() {
    return (
      <div className="profile">
          <div id="detailProfile" className="ui card">
            <div className="image">
              <img className="profilePic" src={profile}/>
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
                  {this.state.tweetData.map(tweet =>
                      <Card className="Tweet_Container">
                          <CardBody className="Tweet">
                              <Feed>
                                  <Feed.Event>
                                      <Feed.Label image={profile} style={{width: "10%", padding: "5px 0"}}/>
                                      <Feed.Content>
                                          <div className="Tweet-Content">
                                              <Feed.Summary content={tweet.username}/>
                                          </div>
                                          <Feed.Extra text content={tweet.tweetText}/> <br/>
                                          <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>} />
                                      </Feed.Content>

                                      <Feed.Label className="Tweet-Delete">
                                          {this.buttonDelete(tweet.userId, tweet._id)}
                                      </Feed.Label>

                                  </Feed.Event>
                              </Feed>
                          </CardBody>
                      </Card>
                  )}
              </div>


          </div>

    );
  }
}

export default Edit_Profile;
