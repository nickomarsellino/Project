import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import { Form,  TextArea, Image } from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Twiit_Box.css'


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
        console.log(this.state.userTweet);
    }


    render() {
        return (
            <div style={{marginTop: "8%", marginBottom: "2%"}}>
                <Card>
                    <CardBody>
                        <div>
                            <Image src={profile} avatar/>
                            <span>{this.state.username}</span>
                        </div>
                        <Form id="Form_Container" onSubmit={this.handleSubmit}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                type="text"
                                control={TextArea}
                                placeholder={"Wassup bro "+this.state.username}
                                style={{maxHeight: "100px"}}
                                name="userTweet"
                                onChange={this.handleInputChange}
                            />
                            <Button color="default"
                                    size="md"
                                    type="submit"
                                    style={{borderRadius: "100px"}}
                            >Post</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Twitt_Box;
