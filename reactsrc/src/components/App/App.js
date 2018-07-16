import React, { Component } from 'react';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import { getFromStorage } from '../../utils/storage';
import axios from 'axios';

class App extends Component {
    componentDidMount() {
      const obj = getFromStorage('bebas');
      if (obj && obj.token) {
        const { token } = obj;
      axios.get('/api/users/verify?token='+ token)
          .then(res => {
              console.log("ressponya message ", res.data.msg);
          });
        }
    }


    render() {
        return(
            <div>
                <div id="navbar">
                    <Navbar/>
                </div>
                <div id="content"></div>

                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
