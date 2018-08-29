import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact"
import './Search_Page.css';
import axios from 'axios';
import TwittContainer from "../Twitt_Container/Twitt_Container";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon, Image} from 'semantic-ui-react';
import profile from '../../daniel.jpg';

import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
//Load another component
import SearchBar from "../Search_Bar/Search_Bar";

const Timestamp = require('react-timestamp');

class Search_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetData : '',
            isSearch: false
        };
        this.searchTweetsData = this.searchTweetsData.bind(this);
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;

        if (imageUrl) {
            return (
                <img alt=" " src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
            );
        }
        else {
            return (
                <img alt=" " src={profile}/>
            );
        }
    }

    viewUserProfile(username, userId) {
        if (this.props.located === "home") {
            //Jika id di container sam dengan yang login sekarang akan ke page "My Profile"
            if(userId === this.props.userId){
                return (
                    <Link to={{
                        pathname: `/home/myProfile/${username}`,
                    }}>
                        <div>
                            <Feed.Summary content={username}/>
                        </div>
                    </Link>
                );
            }
            else{
                return (
                    <Link to={{
                        pathname: `/home/profile/${username}`,
                        state: {
                            userId: userId
                        }
                    }}>
                        <div>
                            <Feed.Summary content={username}/>
                        </div>
                    </Link>
                );
            }
        }

        else if (this.props.located === "profile") {
            return (
                    <div>
                        <Feed.Summary content={username}/>
                    </div>
            );
        }
    }

    searchTweetsData(searchValue){
        axios.get('/api/users/searchByTweets/' + searchValue)
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
                console.log(res.data);
                ReactDOM.render(  <div>
                  {res.data.map(tweet =>
                      <Card className="Tweet_Container" id="text-warp" key={tweet._id}>
                          <CardBody className="Tweet">
                              <Feed>
                                  <Feed.Event>
                                      <Feed.Label style={{width: "56px", padding: "5px 0"}}>
                                          {this.setProfileImage(tweet.profilePicture)}
                                      </Feed.Label>
                                      <Feed.Content className="Tweet-Content"
                                                    onClick={() => this.openModalTweet(tweet._id)}>

                                          {this.viewUserProfile(tweet.username, tweet.userId)}

                                          <Feed.Extra id="tweetText" text content={tweet.tweetText}/> <br/>

                                          <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1}/>}/>

                                          <div>
                                              <Icon.Group>
                                                  9 <Icon name='comments' id="commentsIcon"/>
                                              </Icon.Group>
                                              <Icon.Group>
                                                  10 <Icon name='like' id="likeIcon"/>
                                              </Icon.Group>
                                              <Icon.Group>
                                                  11 <Icon name='sync alternate'/>
                                              </Icon.Group>
                                          </div>
                                      </Feed.Content>
                                  </Feed.Event>
                              </Feed>
                          </CardBody>
                      </Card>
                  )}
                  </div>, document.getElementById('asdf'));
            });
            console.log("ASD: "+searchValue);
    }

    getTweetCounter(tweet) {
        this.setState({tweetCount: tweet});
    }



    render() {
        return (
            <FadeIn>
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        <SearchBar ParentSearchTweetsData={this.searchTweetsData}/>
                        <br/>
                        <center>

                        <div id="navSearchDetail" className="ui three item menu">
                          <a className="item"
                             onClick={() => this.handleItemClicked("searchTweetsData")}>TWEETS</a>
                          <a className="item"
                             onClick={() => this.handleItemClicked("Follower")}>PEOPLES</a>
                        </div>

                        <div id="asdf">
                        </div>

                        </center>
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Search_Page;
