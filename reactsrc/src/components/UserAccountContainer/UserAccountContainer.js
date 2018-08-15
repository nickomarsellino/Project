import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserAccountContainer.css'
import profile from '../../daniel.jpg';

class UserAccountContainer extends Component {
    render() {
        return (
            <div>
                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>
                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>Lil Uzi Vert</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>

                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>
                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>Lil Uzi Vert</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>

                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>
                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>Lil Uzi Vert</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>

                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>

                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>Lil Uzi Vert</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>

                <div className="col-lg-3 col-lg-offset-4 user-Container">
                    <Card>
                        <center>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                style={{width: "80%", margin: "20px"}}
                            />
                        </center>

                        <Card.Content>
                            <center>
                                <Card.Header style={{fontSize: "25px"}}>Lil Uzi Vert</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description id="followButton">
                                    <Icon
                                        size='large'
                                        name='handshake'
                                        id='iconFollow'
                                    />
                                    {' '}Follow
                                </Card.Description>
                            </center>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        );
    }
}

export default UserAccountContainer;
