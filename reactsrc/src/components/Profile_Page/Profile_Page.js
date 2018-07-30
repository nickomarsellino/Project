import React, {Component} from "react";
import axios from "axios/index";
import profile from '../../daniel.jpg';
import ReactDOM from "react-dom";
import './Profile_Page.css';
const Timestamp = require('react-timestamp');

class Edit_Profile extends Component {

  constructor() {
      super();
      this.state = {
          username: '',
          timestamp: '',
          email   : '',
          phone   : ''
      };
  }

  componentWillMount() {
      this.getData();
  }

  getData() {
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
                <i class="envelope outline icon"></i>{this.state.email}
              </div>
              <div className="description">
                <i class="phone icon"></i>{this.state.phone}
              </div>
            </div>
          </div>
          <div className="tweetFollwingFollwers">
            <div>
              <div id="navDetail" class="ui three item menu">
                <a class="item">Tweets</a>
                <a class="item">Following</a>
                <a class="item">Followers</a>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Edit_Profile;
