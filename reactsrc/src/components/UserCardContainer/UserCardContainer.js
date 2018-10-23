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

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    componentWillMount() {

       if(this.props.userSearch){
          console.log("this.props.userSearch: ", this.props.userSearch);
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

   mouseEnter() {
       if(this.state.isFollow){
           this.setState({buttonFollowText: "Unfollow"})
       }
       else {
           this.setState({buttonFollowText: "Follow"})
       }

   }

   mouseLeave() {
       if(this.state.isFollow){
           this.setState({buttonFollowText: "Followed"})
       }
       else {
           this.setState({buttonFollowText: "Follow"})
       }
   }

   onButtonClicked(){
       this.setState({ isFollow: !this.state.isFollow });

       if(this.state.isFollow){
           this.setState({ butttonFollowCondition: "followButton"})
       }
       else{
           this.setState({ butttonFollowCondition: "followedButton"})
       }
   }

   render() {
       return (
           <div className="peopleCards">
               {this.state.userData.map(user =>
                   <UserCardComponent
                       userData = {user}
                       followingData={user}
                       history = {this.props.history}
                   />
               )}
           </div>
       );
   }
}

export default UserCardContainer;
