import React, {Component} from "react";
import './Notification_Container.css';
import {Icon} from 'semantic-ui-react'
import {
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'mdbreact';

class Notification_Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            dropdownOpen: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Dropdown className="navProfile" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav={true}>
                    <Icon name='bell outline'
                          size='large'
                          id="notificationIcon"
                    />
                </DropdownToggle>
                <DropdownMenu id="navNotificationContainer"  style={{
                    WebkitTransform: "translate3d(-111px, 36px, 0)",
                    transform: "translate3d(-111px, 36px, 0)", width: "200px"}}>
                    <DropdownItem>
                           Edit Profile
                    </DropdownItem>
                    <DropdownItem>
                          Change Password
                    </DropdownItem>
                    <DropdownItem>
                       Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default Notification_Container;
