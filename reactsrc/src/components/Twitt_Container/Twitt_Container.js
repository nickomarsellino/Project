import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import { Feed } from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
//load another component
import Modal_Twitt from '../Modal_Detail_Twitt/Modal_Twitt';
import ReactDOM from "react-dom";

const Timestamp = require('react-timestamp');



class Twitt_Container extends Component {

    constructor(){
        super();
        this.state = {
            tweetData : [],
            tweetId : '',
            modalOpen: false
        };

        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        axios.get('/api/users/tweets')
            .then(res => {
                this.setState({
                    tweetData : res.data
                });
                console.log("tweetData ", this.state.tweetData);
            });
    }

    openModal(tweetId){
        this.setState({
            tweetId : tweetId,
            modalOpen: true
        });
    }

    closeModal(isOpen) {
        if(isOpen){
            {
                this.setState({
                    modalOpen: false
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.tweetData.map(tweet =>
                    <Card className="Tweet_Container"
                          onClick={() => this.openModal(tweet._id)}>
                        <CardBody className="Tweet">
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                    <Feed.Content>
                                        <div className="Tweet-Content" >
                                            <Feed.Summary content={tweet.username} />
                                        </div>
                                        <img  className="Tweet-Content" data-toggle="modal" data-target="#exampleModal" id="recycleIcon" style={{width: "3%"}} src="https://cdn1.iconfinder.com/data/icons/squared/64/trash-bin-512.png"/>
                                        <Feed.Extra text content={tweet.tweetText} /> <br />
                                        <Feed.Date content={<Timestamp time={tweet.timestamp} precision={1} />} />
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </CardBody>
                    </Card>
                )}

                <Modal_Twitt
                isOpen = {this.state.modalOpen}
                tweetId = {this.state.tweetId}
                isClose = {this.closeModal}
                />

            </div>
        );
    }
}

export default Twitt_Container;
