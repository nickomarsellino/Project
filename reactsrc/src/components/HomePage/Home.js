import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import { Container ,Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import { Form } from 'semantic-ui-react';
import axios from "axios/index";
import { getFromStorage, setInStorage } from '../../utils/storage';
import background from '../../01ft-01.jpg';
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
      this.state = {
          email: "",
          password: "",
          token: "",
          formMessage: "",
          formStatus: "",
          success: false
      }
      this.handleInputChange = this.handleInputChange.bind(this)  ;
  }

  handleInputChange(e) {
      const target = e.target;
      const name = target.name;
      this.setState({ [name]: target.value });
  }

  componentDidMount() {
    const obj = getFromStorage('bebas');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      console.log("TOKEN "+ token);
      fetch('/api/users/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render(){
    return(
      <div>
        <div id="navbar">
            <Navbar success={true}/>
        </div>

      </div>
    )
  }
}


export default Home;
