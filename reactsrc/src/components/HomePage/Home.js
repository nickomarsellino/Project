import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Navbar from "../Navbar/Navigationbar";

import { Route } from 'react-router-dom';
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
        const coba = ({match}) => (
            <div>
                <h1>INI UNTUK EDIT PROFILE</h1>
                {console.log(match)}
                </div>
        );

    return(
      <div>
        <div id="navbar">
            <Navbar success={true} isToken={this.state.isToken}/>
        </div>

          <Route path={this.props.match.url+'/profile'} component={coba}/>
      </div>
    )
  }
}


export default Home;
