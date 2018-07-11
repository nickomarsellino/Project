import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import { Button } from 'semantic-ui-react'

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
      if(this.props.success){
        return(
            <Navbar light color="teal lighten-2" dark expand="md" scrolling>
                <NavbarBrand href="/">
                    <img src={logo} height="40px"/> Friend Zone ?
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler dark onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav right>
                        <center>
                            <NavItem>
                              WELCOME TO FRIENDZONE  !
                            </NavItem>
                        </center>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
      }
      else{
        return(
            <Navbar light color="teal lighten-2" dark expand="md" scrolling>
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
