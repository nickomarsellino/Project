import React, {Component} from "react";
import {Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import './Home.css';
import {getFromStorage} from "../../utils/storage";
import {Container} from "mdbreact"

//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'
import Twitt_Box from "../Twitt_Box/Twitt_Box";
import Twitt_Container from "../Twitt_Container/Twitt_Container";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        };
    }

    componentWillMount() {
        const obj = getFromStorage('bebas');
        this.setState({
            userId: obj.userId
        });
    }

    render() {

        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

        return (
            <div style={{marginTop: "8%"}}>
                <FadeIn>
                    <div id="navbar">
                        <Navbar success={true}
                                userId={this.state.userId}/>
                    </div>

                    <Container className="col-lg-6 col-lg-offset-2" >
                        <div>
                            <Twitt_Box/>
                        </div>
                        <div>
                            <Twitt_Container/>
                        </div>
                    </Container>


                    <div>
                        <Route path={this.props.match.url + '/profile'} component={editProfile}/>
                    </div>
                </FadeIn>
            </div>
        )
    }
}


export default Home;
