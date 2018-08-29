import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact"
import './Search_Page.css';
import axios from 'axios';

//Load another component
import SearchBar from "../Search_Bar/Search_Bar";

class Search_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetData : '',
            isSearch: false
        };
        this.searchTweetsData = this.searchTweetsData.bind(this);
    }

    searchTweetsData(searchValue){
        axios.get('/api/users/searchByTweets/' + searchValue)
            .then(res => {
                this.setState({
                    tweetData: res.data
                });
                console.log(res.data);
            })
    }


    render() {
        return (
            <FadeIn>
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        <SearchBar ParentSearchTweetsData={this.searchTweetsData}/>
                        <br/>
                        <center>

                        <div id="navSearchDetail" className="ui three item menu">
                          <a className="item itemNav">TWEETS</a>
                          <a className="item itemNav">PEOPLES</a>
                        </div>

                        <div id="asdf">
                        </div>

                        </center>
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Search_Page;
