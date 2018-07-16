import React, { Component } from 'react';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import { getFromStorage } from '../../utils/storage';
import axios from 'axios';

class App extends Component {

    componentWillMount(){
        const obj = getFromStorage('bebas');

        console.log("SESUDAH MENCET LOG OUT: ",obj.token);
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
