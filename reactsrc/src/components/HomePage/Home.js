import React, {Component} from "react";
import {Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import ScrollUpButton from "react-scroll-up-button";
import './Home.css';
import {Container} from "mdbreact"
import LoadingGif from '../../LoadingGif.gif';


//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'
import ChangePassword from '../Form_Change_Password/Change_Password'
import TwittBox from "../Tweets/Twitt_Box/Twitt_Box";
import TwittContainer from "../Tweets/Twitt_Container/Twitt_Container";
import axios from "axios/index";
import ProfilePage from '../Profile_Page/Profile_Page'
import MyProfilePage from '../Profile_Page/Profile_Page'
import SearchPage from '../Search/Search_Page/Search_Page'
import InboxPage from '../Inbox/Inbox_Page/Inbox_Page'
import NotificationPage from '../Notification/Notification_Container/Notification_Container'

import openSocket from "socket.io-client";

const socket = openSocket('http://10.183.28.155:8000');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            profilePicture: '',
            isLoading: true,
            tweetData: '',
            totalLengthData: '',
            lengthData: ''
        };

        this.getTweetDatainHome = this.getTweetDatainHome.bind(this);
    }

    getData() {
        axios.get('/api/users', {
            credentials: 'include',
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    username: res.data.username,
                    userId: res.data._id,
                    profilePicture: res.data.profilePicture
                });
                localStorage.setItem("myThings", res.data._id);
                this.setState({
                    isLoading: false
                })
            });
    }

    verify() {
        axios.get('/api/authentication/verify', {
            credentials: 'include',
            withCredentials: true
        })
            .then(res => {
                if (res.data.success) {
                    this.props.history.push("/home");
                }
                else {
                    this.props.history.push("/signin");
                }
            });
    }


    componentWillMount() {
        this.verify();

        this.getTweetDatainHome();

        this.isCloseMessage();

        socket.on('getData', namavariabel => {
            this.getTweetDatainHome();
        })
    }

    componentDidMount() {
        this.getData();
    }


    getTweetDatainHome() {
        axios.get('/api/tweet/tweets?perPage=5&page=1')
            .then(res => {
                this.setState(
                    {
                        tweetData: res.data.docs,
                        totalLengthData: res.data.total,
                        lengthData: res.data.docs.length
                    })
            });
    }


    isCloseMessage() {
        axios.get('/api/inbox/isCloseMessage')
            .then(res => {

            });
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
            <FadeIn>
                <Container className="col-lg-6 col-lg-offset-2" style={{marginBottom: "5%"}}>
                    <TwittBox username={this.state.username}
                              userId={this.state.userId}
                              profilePicture={this.state.profilePicture}
                    />
                    <TwittContainer userId={this.state.userId}
                                    located="home"
                                    isHome="home"
                                    history={this.props.history}
                                    profilePicture={this.state.profilePicture}
                                    username={this.state.username}
                                    tweetData={this.state.tweetData}
                    />
                </Container>
            </FadeIn>
        );

        const profile = () => (
            <ProfilePage userIdProfile={this.props.location.state}
                         tabClicked={this.props.location.state}
                         userLoginId={localStorage.getItem("myThings")}
                         username={this.state.username}
                         history={this.props.history}
                         profilePicture={this.state.profilePicture}
            />
        );

        const myProfile = () => (
            <MyProfilePage userId={localStorage.getItem("myThings")}
                           tabClicked={this.props.location.state}
                           history={this.props.history}
                           profilePicture={this.state.profilePicture}
            />
        );

        const search = () => (
            <SearchPage userId={this.state.userId}
                        history={this.props.history}
                        searchData={this.props.location.state}
            />
        );

        const inbox = () => (
            <InboxPage userId={this.state.userId}
                       history={this.props.history}
                       onUserClicked={this.props.location.state}
            />
        );

        const notification = () => (
            <NotificationPage/>
        );


        if (this.state.isLoading) {
            return (
                <center>
                    <div className="LoadingGif">
                        <img className="LoadingGif" src={LoadingGif} alt={" "}/>
                    </div>
                </center>
            )
        }

        return (
            <div>
                <ScrollUpButton TransitionBtnPosition={150} ToggledStyle={{paddingLeft: "4px"}}/>
                <FadeIn>
                    <div>
                        <Navbar className="navbarFixed" success={true}/>
                    </div>

                    <div>
                        <Route exact path={this.props.match.url} component={home}/>

                        <Route path={this.props.match.url + '/editProfile'} component={editProfile}/>

                        <Route path={this.props.match.url + '/changePassword'} component={parentChangePw}/>

                        <Route path={this.props.match.url + '/myProfile'} component={myProfile}/>

                        <Route path={this.props.match.url + '/profile'} component={profile}/>

                        <Route path={this.props.match.url + '/search'} component={search}/>

                        <Route path={this.props.match.url + '/inbox'} component={inbox}/>

                        <Route path={this.props.match.url + '/notification'} component={notification}/>

                    </div>
                </FadeIn>
            </div>
        )
    }
}


export default Home;
