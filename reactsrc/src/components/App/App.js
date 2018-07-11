import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";
import ReactDOM from "react-dom";

class App extends Component {
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
