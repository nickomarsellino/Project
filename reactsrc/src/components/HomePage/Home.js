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
            userId: '',
        };
    }

    componentWillMount(){
        const obj = getFromStorage('bebas');
        this.setState({
            userId: obj.userId
        });
        console.log("obj ",obj);
    }

  render(){
    return(
      <div>
        <div id="navbar">
            <Navbar success={true} userId={this.state.userId}/>
        </div>

      </div>
    )
  }
}


export default Home;
