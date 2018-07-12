import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import { Container ,Row, Col, Card, CardBody, Button} from 'mdbreact';
import MessageValidation from '../MessageValidationBox/MessageValidation'
import { Form } from 'semantic-ui-react';
import axios from "axios/index";
import background from '../../01ft-01.jpg';
import './Home.css';

class Home extends Component {
  render(){
    return(
      <div>
        <div id="navbar">
            <Navbar success={true}/>
        </div>
        <center>
          <img className="bgImage" src={background} />
        </center>
      </div>
    )
  }
}


export default Home;
