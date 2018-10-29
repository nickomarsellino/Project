import React, {Component} from "react";
import './Notification_Container.css';
import {Dropdown} from 'semantic-ui-react'

class Notification_Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <Dropdown icon='bell outline large' id="notificationIcon">
                <Dropdown.Menu className="notificationContainer">
                    <Dropdown.Header icon='tags' content='Filter by tag'/>
                    <Dropdown.Item>Important</Dropdown.Item>
                    <Dropdown.Item>Announcement</Dropdown.Item>
                    <Dropdown.Item>Discussion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default Notification_Container;
