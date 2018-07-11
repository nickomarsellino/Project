import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import { Container ,Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import { Form } from 'semantic-ui-react';
import axios from "axios/index";
import './Home.css';

class Home extends Component {
  render(){
    return(
      <div>
        <div id="navbar">
            <Navbar isSuccess={true}/>
        </div>
        <center>
          <img className="bgImage" src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/7t3l8uJ/social-media-platforms-with-their-logos-on-white-background_4yh1bl90__F0014.png" />
        </center>
      </div>
    )
  }
}


export default Home;
