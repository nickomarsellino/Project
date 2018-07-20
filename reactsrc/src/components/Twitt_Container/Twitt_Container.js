import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import { Feed } from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Twiit_Container.css';

class Twitt_Container extends Component {

    constructor(){
        super();
        this.state = {
            tweetData : [],
            userId: [],
            username: []
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
                this.getUserData(res.data)
            });
    }

    getUserData(){


        {this.state.tweetData.map(tweet =>
            this.setState({ userId: this.state.userId.concat(tweet.userId) })
        )}

        console.log(this.state.userId);


        // console.log("Ini User Id: ",userId);
        // var userIdTempt = this.state.userId.concat(userId);
        // this.setState({ userId: userIdTempt });
        // console.log("Ini State User Id: ",this.state.userId);

        // axios.get('/api/users/'+userId)
        //     .then(res => {
        //         var username = this.state.username.concat(res.data.username);
        //         this.setState({ username: username })
        //     });
        // console.log("Ini Isi State Username: ",this.state);
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
                                            <Feed.Summary content={tweet.userId} />
                                        </div>
                                        <img className="Tweet-Content" id="recycleIcon" style={{width: "3%"}} src="https://cdn1.iconfinder.com/data/icons/squared/64/trash-bin-512.png"/>
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