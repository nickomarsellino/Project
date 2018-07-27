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
import {getFromStorage, setInStorage} from '../../utils/storage';
import profile from '../../daniel.jpg';
import {Button, Image} from 'semantic-ui-react'
import './Navbar.css'

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
    axios.get('/api/users/' + this.props.userId).then(res => {
      this.setState({userName: res.data.username});
      // console.log("state ", this.state);
    });
  }

  componentWillMount() {
    this.getData();
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
    const obj = getFromStorage('bebas');

    axios.get('/api/users/logout?token=' + obj.token).then(res => {
      setInStorage('bebas', {
        token: " ",
        userId: " "
      });
    });
  }

  render() {
    if (this.props.success) {
      return (<Navbar light="light" color="teal lighten-2" expand="md" dark="true" scrolling="scrolling">
        <NavbarBrand href="/">
          <img src={logo} alt="" height="30px"/>
          Friend Zone ?
        </NavbarBrand>
        {
          !this.state.isWideEnough && <NavbarNav right="right">
              <NavItem >
                <Link to={'/home/profile/' + this.state.userName}>
                    <Image className="navProfile" src={profile} avatar="avatar"/>
                    <span className="navProfile">{this.state.userName}</span>
                </Link>

                <Dropdown className="navProfile" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle nav="nav" caret="caret"></DropdownToggle>
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
    } else {
      return (<Navbar light="light" color="teal lighten-2" dark="true" expand="md" scrolling="scrolling">
        <NavbarBrand href="/">
          <img src={logo} alt="" height="40px"/>
          Friend Zone ?
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler dark="dark" onClick={this.onClick}/>}
        <Collapse isOpen={this.state.collapse} navbar="navbar">
          <NavbarNav right="right">
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
