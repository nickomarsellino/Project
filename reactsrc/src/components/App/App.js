import React, { Component } from 'react';
import Footer from '../Footer/Footer_Bar';
import Navbar from "../Navbar/Navigationbar";

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
