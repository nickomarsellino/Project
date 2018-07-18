import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import { Feed } from 'semantic-ui-react';
import profile from '../../daniel.jpg';


const date = '3 days ago'
const summary = 'Lil Uzi Vert'
const extraText = "XO TOUR Llif3 SAUCE IT UP"

class Twitt_Container extends Component {
    render() {
        return (
            <div>
                <Card style={{marginTop: "3px"}}>
                    <CardBody style={{padding: "10px"}}>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                <Feed.Content>
                                    <Feed.Summary content={summary} />
                                    <Feed.Date content={date} />
                                    <Feed.Extra text content={extraText} />
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>

                <Card style={{marginTop: "3px"}}>
                    <CardBody style={{padding: "10px"}}>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                <Feed.Content>
                                    <Feed.Summary content={summary} />
                                    <Feed.Date content={date} />
                                    <Feed.Extra text content={extraText} />
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>

                <Card style={{marginTop: "3px"}}>
                    <CardBody style={{padding: "10px"}}>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={profile} style={{width: "10%",  padding: "5px 0"}}/>
                                <Feed.Content>
                                    <Feed.Summary content={summary} />
                                    <Feed.Date content={date} />
                                    <Feed.Extra text content={extraText} />
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default Twitt_Container;