import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import {Form, TextArea, Image} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Twiit_Box.css'
import axios from "axios/index";
import {setInStorage} from "../../utils/storage";


class Twitt_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            userTweet: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        const username = this.props.username;

        this.setState({
            userId: userId,
            username: username
        });
    }


    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        this.setState({[name]: target.value});

    }

    handleSubmit(e) {

        e.preventDefault();

        const tweet = {
            tweetText: this.state.userTweet,
            username: this.state.username,
            userId: this.state.userId
        };

        const method = 'post';
        axios({
            method: method,
            responseType: 'json',
            url: `http://localhost:3000/api/users/tweet/` + this.state.userId,
            data: tweet
        })
            .then(() => {
                window.location.reload();
            });
    }


    render() {
        return (
            <div style={{marginTop: "8%", marginBottom: "2%"}}>
                <Card>
                    <CardBody>
                        <div className="profileBox">
                            <Image src={profile} avatar id="avatarBox"/>
                            <span><h5 id="nameBox">{this.state.username}</h5></span>
                        </div>
                        <Form id="Form_Container" onSubmit={this.handleSubmit}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                type="text"
                                control={TextArea}
                                placeholder={"Have a nice day " + this.state.username}
                                style={{maxHeight: "100px"}}
                                name="userTweet"
                                onChange={this.handleInputChange}
                            />
                            <div id="buttonBox">
                                <Button color="default"
                                        size="md"
                                        type="submit"
                                        style={{borderRadius: "100px"}}
                                >Post</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Twitt_Box;
