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
                console.log("respon GET req ", this.state.tweetData);
            });
      }

    render() {
        return (
            <div>
              {this.state.tweetData.map(tweet =>
                <Card style={{marginTop: "3px"}}>
                    <CardBody style={{padding: "10px"}}>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                <Feed.Content>
                                    <div className="asdf" >
                                        <Feed.Summary content={tweet.username} />
                                    </div>
                                    <img className="asdf" id="recycleIcon" style={{width: "3%"}} src="https://cdn1.iconfinder.com/data/icons/squared/64/trash-bin-512.png"/>
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
