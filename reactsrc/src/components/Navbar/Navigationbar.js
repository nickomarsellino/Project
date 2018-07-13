import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarNav,
    NavbarToggler, Collapse, NavItem ,DropdownItem
    , Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';

import profile from '../../daniel.jpg';
import { Button, Image } from 'semantic-ui-react'

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userId: "",
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    getData(){
      console.log(this.props.userId);
        axios.get('/api/users/'+this.props.userId)
            .then(res => {
                this.setState({
                    userName: res.data.username ,
                    userId: res.data._id
                });
                console.log(this.state);
            });
    }

    componentDidMount() {
        this.getData();
    }


    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
      if(this.props.success){
        return(
            <Navbar light color="teal lighten-2" dark="true" expand="md" scrolling>
                <NavbarBrand href="/">
                    <img src={logo} height="30px"/> Friend Zone ?
                </NavbarBrand>
                { !this.state.isWideEnough &&
                <NavbarNav right>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>
                                <Image src={profile} avatar />
                                <span>{this.state.userName}</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">Edit Profile</DropdownItem>
                                <DropdownItem href="#">Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                </NavbarNav>
                }
            </Navbar>
        );
      }
      else{
        return(
            <Navbar light color="teal lighten-2" dark="true" expand="md" scrolling>
                <NavbarBrand href="/">
                    <img src={logo} height="40px"/> Friend Zone ?
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler dark onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>
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
