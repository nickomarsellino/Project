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
import axios from "axios/index";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: ''
        };
    }

    getData() {
        // console.log(this.props.userId);
        axios.get('/api/users/' + this.state.userId)
            .then(res => {
                this.setState({
                    username: res.data.username
                });
            });
    }

    componentWillMount() {
        const obj = getFromStorage('bebas');
        this.setState({
            userId: obj.userId
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

        const home = () => (
            <Container className="col-lg-6 col-lg-offset-2" style={{marginBottom: "5%"}}>
                <div>
                    <Twitt_Box username={this.state.username}
                    userId={this.state.userId}
                    />
                </div>
                <div>
                    <FadeIn>
                        <Twitt_Container/>
                    </FadeIn>
                </div>
            </Container>
        );

        return (
            <div>
                <FadeIn>
                    <div id="navbar">
                        <Navbar success={true} userId={this.state.userId}/>
                    </div>

                    <div>
                        <Route exact path={this.props.match.url} component={home}/>
                        <Route path={this.props.match.url + '/profile'} component={editProfile}/>
                    </div>
                </FadeIn>
            </div>
        )
    }
}


export default Home;
