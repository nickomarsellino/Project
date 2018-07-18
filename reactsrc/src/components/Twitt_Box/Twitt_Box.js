import React, {Component} from "react";
import './Twitt_Box.css';
import {Card, CardBody, Button} from "mdbreact"
import { Form,  TextArea, Image } from 'semantic-ui-react'
import profile from '../../daniel.jpg';

class Twitt_Box extends Component {
    render() {
        return (
            <div style={{marginTop: "8%", marginBottom: "2%"}}>
                <Card>
                    <CardBody>
                        <div>
                            <Image src={profile} avatar/>
                            <span>Lil Uzi Vert</span>
                        </div>
                        <Form style={{marginTop: "1%"}}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                control={TextArea}
                                placeholder='Wassup Bor ?'
                                style={{maxHeight: "100px"}}
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