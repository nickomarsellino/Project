import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import {Feed, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../LoadingGif.gif';

//load another component
import ModalTwitt from '../Modal/Modal_Detail_Twitt/Modal_Twitt';
import ModalDelete from '../Modal/Modal_Delete/Modal_Delete';
import TweetComponent from '../TweetComponent/TweetComponent';

import openSocket from 'socket.io-client';

// Ini yang nge buat dia connect sama si backend nya
const socket = openSocket('http://10.183.28.153:8000');



const Timestamp = require('react-timestamp');


class Twitt_Container extends Component {

    constructor() {
        super();
        this.state = {
            tweetData: [],
            tweet: [],
            tweetCounter: '',
            userId: '',
            modalTweet: false,
            modalDelete: false,
            checkLikes: false,
            isLoading:true
        };
        this.getTweetData = this.getTweetData.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        this.setState({
            userId: userId
        });

        if (this.props.TweetUserId) {
            this.getUserProfile();
        }
        else {
            this.getTweetData();
            socket.on('getData', namavariabel => {
                this.setState({
                    tweetData: this.state.tweetData.concat(namavariabel)
                })
            })
        }
    }

    getUserProfile() {
        axios.get('/api/tweet/profiletweet/' + this.props.TweetUserId)
            .then(res => {
                this.setState({
                    tweetData: res.data,
                    tweetCounter: res.data.length
                });
                // get berapa banyak data tweet nya
                this.props.tweetCounter(res.data.length)
                // maksudnya dikirim ke profilepage, tweetCounter di profilepage
            });
    }

    getTweetData() {
        const url = '/api/tweet/tweets';
            fetch(url, {
                method: 'GET',
            }).then(res => res.json())
            .then(response =>{
                this.setState({
                  tweetData: response
                })
                console.log(this.state.tweetData);
                this.setState({
                  isLoading:false
                })}
            )
            .catch(error => console.error('Error:', error));
    }

    isEmptyTweet(){
        if(this.props.located === "profile"){
            if(this.state.tweetCounter === 0){
                return (
                    <Card className="Tweet_Container" id="text-warp">
                        <CardBody className="Tweet">
                            <center>
                                <h3>Sorry, We Didnt Find Something In Here :) </h3>
                            </center>
                        </CardBody>
                    </Card>
                );
            }
        }
    }


    render() {
      {console.log("propsuserid: ", this.props.userId);}
      {console.log("checkLikes: ", this.state.checkLikes);}

      if(this.state.isLoading){
        return null
      }
      return (
      <div id="scrollableDiv" style={{ overflow: "auto" }}>
        {this.state.tweetData.slice(0).reverse().map(tweet =>
            <TweetComponent tweet={tweet} history={this.props.history} userId={this.props.userId}  located="home"/>
        )}

      </div>
    );
  }
}

export default Twitt_Container;
