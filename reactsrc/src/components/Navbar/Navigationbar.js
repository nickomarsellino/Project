import React, {Component} from 'react';
import axios from 'axios';
import {Icon} from 'semantic-ui-react'
import logo from '../../womantalk_logo.png';
import {Link} from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'mdbreact';
import profile from '../../daniel.jpg';
import {Button, Image} from 'semantic-ui-react'
import './Navbar.css'

import NotificationContainer from '../Inbox/Inbox_Chat_Container/Inbox_Chat_Container';

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isInbox: false,
            userName: "",
            userId: "",
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            profilePicture: ""
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
        this.inboxClicked = this.inboxClicked.bind(this);
    }

    getProfilePicture() {
        axios.get('/api/users', {
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    userName: res.data.username,
                    userId: res.data._id,
                    profilePicture: res.data.profilePicture
                });
            });
    }

    componentWillMount() {
        this.getProfilePicture();
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        axios.get('/api/users/logout');
    }

    searchClicked() {
        this.setState({isSearch: !this.state.isSearch});
    }

    isSearch() {
        if (window.location.href === "http://localhost:3001/home/search/") {
            if (this.state.isSearch) {
                return (
                    <Link to={'/home'}>
                        <Icon name='cancel'
                              size='large'
                              id="cancelIcon"
                              onClick={this.searchClicked}/>
                    </Link>
                );
            }
            else {
                return (
                    <Link to={'/home/search/'}>
                        <Icon name='search'
                              size='large'
                              id="searchIcon"
                              onClick={this.searchClicked}/>
                    </Link>
                );
            }
        }
        else {
            return (
                <Link to={'/home/search/'}>
                    <Icon name='search'
                          size='large'
                          id="searchIcon"
                          onClick={this.searchClicked}/>
                </Link>
            );
        }
    }

    inboxClicked() {
        this.setState({isInbox: !this.state.isInbox});
    }

    isInbox() {
        if (window.location.href === "http://localhost:3001/home/inbox") {
            if (this.state.isInbox) {
                return (
                    <Link to={'/home'}>
                        <Icon name='envelope open outline'
                              size='large'
                              id="notificationIcon"
                              onClick={this.inboxClicked}
                        />
                    </Link>
                );
            }
            else {
                return (
                    <Link to={'/home/inbox'}>
                        <Icon name='envelope open outline'
                              size='large'
                              id="notificationIcon"
                              onClick={this.inboxClicked}
                        />
                    </Link>
                );
            }
        }
        else {
            return (
                <Link to={'/home/inbox'}>
                    <Icon name='envelope open outline'
                          size='large'
                          id="notificationIcon"
                          onClick={this.inboxClicked}
                    />
                </Link>
            );
        }

    }

    render() {

        let imageUrl = this.state.profilePicture;
        let imagedisplay

        if (imageUrl) {
            imagedisplay = <img alt=" " src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
        }
        else {
            imagedisplay = <img alt=" " src={profile}/>
        }

        if (this.props.success) {
            return (
                <Navbar light={true} color="white" expand="md" dark={true} scrolling={true}>
                    <NavbarBrand href="/home" id="logoText">
                        <img src={logo} alt="" height="30px"/>
                        {' '}
                    </NavbarBrand>
                    <p id="namaFitur">WomanLounge</p>
                    {
                        !this.state.isWideEnough && <NavbarNav right={true}>
                            <NavItem>
                                <div className="buttonContainer">
                                    {this.isSearch(this.state.isSearch)}
                                    {this.isInbox(this.state.isInbox)}
                                </div>
                            </NavItem>

                            <NavItem id="profileContainer">
                                <Link to={'/home/myProfile/' + this.state.userName.replace(' ', '')}>
                                    <Image className="navProfile" id="ProfilePicture" src={profile} avatar={true}>
                                        {imagedisplay}
                                    </Image>
                                    <span className="navProfile" id="ProfileName">{this.state.userName}</span>
                                </Link>

                                <Dropdown className="navProfile" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle nav={true} caret={true} id="caretColor"/>
                                    <DropdownMenu id="navProfileContainer">

                                        <DropdownItem>
                                            <Link to={'/home/editProfile/' + this.state.userName.replace(' ', '')}>
                                                Edit Profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={'/home/changePassword/' + this.state.userName.replace(' ', '')}>
                                                Change Password
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
                </Navbar>);
        }
        else {
            return (<Navbar light={true} color="white" dark={true} expand="md" scrolling={true}>
                <NavbarBrand href="/home">
                    <img src={logo} alt="" height="40px"/>
                </NavbarBrand>
                <p id="namaFitur">WomanLounge</p>
                {!this.state.isWideEnough && <NavbarToggler dark="dark" onClick={this.onClick}/>}
                <Collapse isOpen={this.state.collapse} navbar={true}>
                    <NavbarNav right={true}>
                        <center>
                            <NavItem>
                                <Link to={'/signin'}>
                                    <Button color="white">
                                        <p>Sign In</p>
                                    </Button>
                                </Link>

                                <Link to={'/register'}>
                                    <Button color="white">
                                        <p>Register</p>
                                    </Button>
                                </Link>

                            </NavItem>
                        </center>
                    </NavbarNav>
                </Collapse>
            </Navbar>);
        }
    }
}

export default Navigationbar;
