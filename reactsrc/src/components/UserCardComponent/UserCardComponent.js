import axios from "axios/index";
import React, {Component} from "react";
import {Card, Icon, Image} from 'semantic-ui-react';
import './UserCardComponent.css';
import profile from '../../daniel.jpg';

class UserCardComponent extends Component {

    constructor() {
        super();
        this.state = {
            hasilGet: '',
            userIdFollow: [],
            userData: [],
            isFollow: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButton"
        };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    componentDidMount() {
        this.setState({
            userData: this.props.userData
        });

        this.getSpecificFollowingUser();
    }

    getSpecificFollowingUser(){
        axios.get('/api/users/profile/'+this.props.userData)
            .then(res => {
                this.setState({
                    userData: res.data[0]
                });
            });
    }

    setProfileImage(profilePicture) {
       let imageUrl = profilePicture;

       if (imageUrl) {
           return (
               <img alt=" " id="ProfileImage" src={require(`../../uploads/${imageUrl}`)} className="float-right"/>
           );
       }
       else {
           return (
               <img alt=" " src={profile} id="ProfileImage"/>
           );
       }
   }

   viewUserProfile(username, userId) {
       if (localStorage.getItem("myThings") === userId) {
           this.props.history.push({
               pathname: `/home/myProfile/${username}`.replace(' ', ''),
           })
       }
       else {
           this.props.history.push({
               pathname: `/home/profile/${username}`.replace(' ', ''),
               state: {
                   userId: userId
               }
           })
       }
   }

   mouseEnter() {
       if (this.state.isFollow) {
           this.setState({buttonFollowText: "Unfollow"})
       }
       else {
           this.setState({buttonFollowText: "Follow"})
       }

   }

   mouseLeave() {
       if (this.state.isFollow) {
           this.setState({buttonFollowText: "Followed"})
       }
       else {
           this.setState({buttonFollowText: "Follow"})
       }
   }

   onButtonClicked() {
       this.setState({isFollow: !this.state.isFollow});

       if (this.state.isFollow) {
           this.setState({butttonFollowCondition: "followButton"})
       }
       else {
           this.setState({butttonFollowCondition: "followedButton"})
       }
   }

   render() {
       return (
           <div className="col-lg-3 col-lg-offset-4 user-Container" key={this.state.userData._id}>
               <Card>
                   <center>
                       <Image style={{margin: "20px"}}
                              onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}>
                           {this.setProfileImage(this.state.userData.profilePicture)}
                       </Image>
                   </center>
                   <Card.Content>
                       <center>
                           <Card.Header className="profileName"
                                        onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}>
                               {this.state.userData.username}
                           </Card.Header>
                           <Card.Description
                               id={this.state.butttonFollowCondition}
                               onMouseEnter={this.mouseEnter}
                               onMouseLeave={this.mouseLeave}
                               onClick={() => this.onButtonClicked(this.state.isFollow)}
                           >
                               <Icon
                                   size='large'
                                   name='handshake'
                                   id='iconFollow'
                               />
                               {' '}{this.state.buttonFollowText}
                           </Card.Description>
                       </center>
                   </Card.Content>
               </Card>
           </div>
       );
   }
}

export default UserCardComponent;
