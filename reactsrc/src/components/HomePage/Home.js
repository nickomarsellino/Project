import React, {Component} from "react";
import {Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import './Home.css';
import {getFromStorage} from "../../utils/storage";
import {Container} from "mdbreact"

//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'
import ChangePassword from '../Form_Change_Password/Change_Password'
import TwittBox from "../Twitt_Box/Twitt_Box";
import TwittContainer from "../Twitt_Container/Twitt_Container";
import axios from "axios/index";
import ProfilePage from '../Profile_Page/Profile_Page'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: ''
        };
    }

    getData() {
        axios.get('/api/users',{
            credentials:'include',
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    username: res.data.username,
                    userId: res.data._id
                });
            });
    }


    componentDidMount() {
        this.getData();
    }

    render() {

        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

        // get the local storage
        const parentChangePw = () => (
            <ChangePassword userId={this.state.userId}/>
        );

        const home = () => (
            <Container className="col-lg-6 col-lg-offset-2" style={{marginBottom: "5%"}}>
                <div>
                    <TwittBox username={this.state.username}
                               userId={this.state.userId}
                    />
                </div>
                <div>
                    <TwittContainer userId={this.state.userId}/>
                </div>
            </Container>
        );

        const profile = () => (
            <ProfilePage userId={this.state.userId}/>
        );

        return (
            <div>
                <FadeIn>
                    <div>
                        <Navbar className="navbarFixed" success={true}/>
                    </div>

                    <div>
                        <Route exact path={this.props.match.url} component={home}/>

                        <Route path={this.props.match.url + '/editProfile'} component={editProfile}/>

                        <Route path={this.props.match.url + '/changePassword'} component={parentChangePw}/>

                        <Route path={this.props.match.url +'/profile'} component={profile}/>

                    </div>
                </FadeIn>
            </div>
        )
    }
}


export default Home;
