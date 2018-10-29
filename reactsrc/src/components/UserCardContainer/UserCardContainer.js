import axios from "axios/index";
import React, {Component} from "react";
import equal from 'fast-deep-equal'

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

    componentDidUpdate(prevProps) {
        console.log()
    }

    componentDidUpdate(prevProps) {

        if(this.props.followingData){
            if(!equal(this.props.followingData, prevProps.followingData)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
            {
                console.log("INI NOW following: ",this.props.followingData);
                this.setState({
                    userData: this.state.userData.concat(this.props.followingData)
                });
            }
        }

        else if(this.props.followersData){
            if (!equal(this.props.followersData, prevProps.followersData)){
                console.log("INI NOW follower: ",this.props.followersData);
                this.setState({
                    userData: this.state.userData.concat(this.props.followersData)
                });
            }
        }

    }

   render() {
      return (
           <div className="peopleCards">
               {this.state.userData.map(user =>
                   <UserCardComponent
                       located = {this.props.located}
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
