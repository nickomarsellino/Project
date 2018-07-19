import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import { Form,  TextArea, Image } from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import {getFromStorage} from "../../utils/storage";


class Twitt_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: ''
        };
    }

    componentWillMount() {
        const userId = this.props.userId;
        const userName = this.props.userName;

        this.setState({
            userId: userId,
            userName: userName
        });
    }

    render() {
        return (
            <div style={{marginTop: "8%", marginBottom: "2%"}}>
                <Card>
                    <CardBody>
                        <div>
                            <Image src={profile} avatar/>
                            <span>{this.state.userName}</span>
                        </div>
                        <Form style={{marginTop: "1%"}}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                control={TextArea}
                                placeholder={"Wassup bro "+this.state.userName}
                                style={{maxHeight: "100px"}}
                                name="tweetText"
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
