import axios from "axios/index";
import React, {Component} from "react";

import UserCardComponent from '../UserCardComponent/UserCardComponent'

class UserCardContainer extends Component {

    constructor() {
        super();
        this.state = {
            userData: [],
            isFollow: false,
            buttonFollowText: "Follow",
            butttonFollowCondition: "followButton"
        };
    }

    componentWillMount() {
       if(this.props.userSearch){
           this.setState({
               userData: this.props.userSearch
           });
       }
       else {
           axios.get('/api/users/profile/')
               .then(res => {
                   this.setState({
                       userData: res.data
                   });
               });
       }
   }

   componentDidMount(){
        if(this.props.followingData){
            this.setState({
                userData: this.props.followingData
            })
        }
        else if(this.props.followersData){
            this.setState({
                userData: this.props.followersData
            })
        }
   }


   render() {
       return (
           <div className="peopleCards">
               {this.state.userData.map(user =>
                   <UserCardComponent
                       userLoginFollowingData = {this.props.userLoginFollowingData}
                       userData = {user}
                       history = {this.props.history}
                   />
               )}
           </div>
       );
   }
}

export default UserCardContainer;
