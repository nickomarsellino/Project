import React, {Component} from "react";
import {Card, CardBody} from "mdbreact"
import { Feed } from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';
import {getFromStorage} from "../../utils/storage";
import TimeAgo from 'javascript-time-ago'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class Twitt_Container extends Component {

    constructor(){
        super();
        this.state = {
            tweetData : []
        }
        this.getData = this.getData.bind(this)
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



    render() {
        return (
            <div>
                {this.state.tweetData.map(tweet =>
                    <Card className="Tweet_Container">
                        <CardBody className="Tweet">
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                    <Feed.Content>
                                        <div className="Tweet-Content" >
                                            <Feed.Summary content={tweet.username} />
                                        </div>

                                        <img  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" className="Tweet-Content" id="recycleIcon" style={{width: "3%"}} src="https://cdn1.iconfinder.com/data/icons/squared/64/trash-bin-512.png"/>

                                        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
                                        <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog">


                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                  </div>
                  <div class="modal-body">
                    <p>Some text in the modal.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
                </div>
                  </div>


                                        <Feed.Extra text content={tweet.tweetText} /> <br />
                                        <Feed.Date content={tweet.timestamp} />
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </CardBody>
                    </Card>
                )}
            </div>
        );
    }
}

export default Twitt_Container;
