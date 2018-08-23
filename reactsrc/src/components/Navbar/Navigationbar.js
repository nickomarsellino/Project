import React, {Component} from 'react';
import axios from 'axios';
import logo from '../../logo.png';
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
import SearchBar from '../Search_Bar/Search_Bar'

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {

      var imageUrl = this.state.profilePicture;
      let imagedisplay

      if(imageUrl){
          imagedisplay = <img src={require(`../../uploads/${imageUrl}`)} className="float-right" />
      }
      else{
        imagedisplay = <img src={profile} />
      }

      console.log("state di navbar :",this.state);
        if (this.props.success) {
            return (
                <Navbar light={true} color="teal lighten-2" expand="md" dark={true} scrolling={true}>
                    <NavbarBrand href="/home">
                        <img src={logo} alt="" height="30px"/>
                        Friend Zone ?
                    </NavbarBrand>
                    {
                        !this.state.isWideEnough && <NavbarNav right={true}>
                            <NavItem>
                                <SearchBar/>
                            </NavItem>

                            <NavItem>
                                <Link to={'/home/myProfile/' + this.state.userName}>
                                    <Image className="navProfile" src={profile} avatar={true}>
                                        {imagedisplay}
                                    </Image>
                                    <span className="navProfile">{this.state.userName}</span>
                                </Link>

                                <Dropdown className="navProfile" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle nav={true} caret={true}/>
                                    <DropdownMenu>

                                        <DropdownItem>
                                            <Link to={'/home/editProfile/' + this.state.userName}>
                                                Edit Profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={'/home/changePassword/' + this.state.userName}>
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
            return (<Navbar light={true} color="teal lighten-2" dark={true} expand="md" scrolling={true}>
                <NavbarBrand href="/home">
                    <img src={logo} alt="" height="40px"/>
                    Friend Zone ?
                </NavbarBrand>
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
