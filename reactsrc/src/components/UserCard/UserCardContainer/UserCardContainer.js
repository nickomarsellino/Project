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

    componentWillReceiveProps(nextProps){
        if(nextProps.followingData){
            if(!equal(nextProps.followingData, this.state.userData)){
                this.setState({
                    userData: nextProps.followingData
                });
            }
        }

        else if(nextProps.followersData){
            if(!equal(nextProps.followersData, this.state.userData)){
                this.setState({
                    userData: nextProps.followersData
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
