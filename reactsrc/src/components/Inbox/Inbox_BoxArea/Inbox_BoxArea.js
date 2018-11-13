import React, {Component} from "react";
import {Form, TextArea} from 'semantic-ui-react'
import {Button} from "mdbreact"

import './Inbox_BoxArea.css'

class Inbox_BoxArea extends Component {


    render() {
        return (
            <div id="inboxBoxContainer">
                <Form.Field
                    type="text"
                    id="inboxBox"
                    maxLength="100"
                    control={TextArea}
                    placeholder="Write Your Message..."
                    style={{maxHeight: "60px", minHeight: "50px", width: "836px"}}
                    // onChange={this.handleInputChange}
                />

                <Button color="default"
                        size="md"
                        type="submit"
                        id="inboxButton"
                >Send</Button>
            </div>
        )
    }
}

export default Inbox_BoxArea;
