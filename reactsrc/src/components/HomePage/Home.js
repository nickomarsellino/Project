import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Navbar from "../Navbar/Navigationbar";
import axios from "axios/index";

import './Home.css';
import {getFromStorage} from "../../utils/storage";



class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isToken: '',
        };
    }

    componentWillMount(){
        const obj = getFromStorage('bebas');
        this.setState({
            isToken: obj.token
        });
    }

  render(){
    return(
      <div>
        <div id="navbar">
            <Navbar success={true} isToken={this.state.isToken}/>
        </div>

      </div>
    )
  }
}


export default Home;
