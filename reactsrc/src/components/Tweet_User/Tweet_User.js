import React, {Component} from "react";
import { Route } from 'react-router-dom';
import './Home.css';
import {getFromStorage} from "../../utils/storage";

//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'

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
    }

  render(){

        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

    return(
      <div>
        <div id="navbar">
            <Navbar success={true}
            userId={this.state.userId} />
        </div>
        <div>
            <Route path={this.props.match.url+'/profile'} component={editProfile}/>
        </div>

        <div>
          <input type="text" />
        </div>
      </div>
    )
  }
}


export default Home;
