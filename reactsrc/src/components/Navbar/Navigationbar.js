import React, {Component} from 'react';
import axios from 'axios';
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
import {
    Navbar, NavbarBrand, NavbarNav,
    NavbarToggler, Collapse, NavItem, DropdownItem
    , Dropdown, DropdownToggle, DropdownMenu
} from 'mdbreact';
import Search_Bar from "../Search_Bar/Search_Bar";
import {getFromStorage, setInStorage} from '../../utils/storage';
import profile from '../../daniel.jpg';
import {Button, Image} from 'semantic-ui-react'

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    getData() {
        // console.log(this.props.userId);
        axios.get('/api/users/' + this.props.userId)
            .then(res => {
                this.setState({
                    userName: res.data.username
                });
                console.log("state ", this.state);
            });
    }

    componentWillMount() {
        this.getData();
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        const obj = getFromStorage('bebas');

        axios.get('/api/users/logout?token=' + obj.token)
            .then(res => {
                setInStorage('bebas', {
                    token: " ",
                    userId: " "
                });
            });
    }

    render() {
        if (this.props.success) {
            return (
                <Navbar light color="teal lighten-2"
                        expand="md" dark="true" scrolling>
                    <NavbarBrand href="/">
                        <img src={logo} alt="" height="30px"/> Friend Zone ?
                    </NavbarBrand>
                    {!this.state.isWideEnough &&
                    <NavbarNav right>
                        <NavItem>
                            <Search_Bar/>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav caret>
                                    <Image src={profile} avatar/>
                                    <span>{this.state.userName}</span>
                                </DropdownToggle>
                                <DropdownMenu>

                                    <DropdownItem>
                                        <Link to={'/home/profile'}>
                                            Edit Profile
                                        </Link>
                                    </DropdownItem>

                                    <DropdownItem onClick={this.logout}>
                                        <Link to={'/signin'}>
                                            Log Out
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>
                    }
                </Navbar>
            );
        }

        else {
            return (
                <Navbar light color="teal lighten-2" dark="true" expand="md" scrolling>
                    <NavbarBrand href="/">
                        <img src={logo} alt="" height="40px"/> Friend Zone ?
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler dark onClick={this.onClick}/>}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav right>
                            <center>
                                <NavItem>
                                    <Link to={'/signin'}>
                                        <Button color="white"><p>Sign In</p></Button>
                                    </Link>

                                    <Link to={'/register'}>
                                        <Button color="white"><p>Register</p></Button>
                                    </Link>

                                </NavItem>
                            </center>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            );
        }
    }
}

export default Navigationbar;
