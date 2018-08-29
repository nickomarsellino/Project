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
            tweetData: '',
            isSearch: false
        };
        this.searchTweetsData = this.searchTweetsData.bind(this);
        this.isSearched = this.isSearched.bind(this);
    }

    searchTweetsData(searchValue) {
        axios.get('/api/users/searchByTweets/' + searchValue)
            .then(res => {
                this.setState({
                    tweetData: res.data,
                    isSearch: true
                });
                console.log(res.data);
            })
    }

    isSearched(isSearch) {
        if (isSearch) {
            if (this.state.tweetData.length === 0) {
                return (
                    <FadeIn>
                        <h1>DATA NOT FOUND CUK ...</h1>
                    </FadeIn>
                );
            }
            else {
                return (
                    <FadeIn>
                        <div id="navSearchDetail" className="ui three item menu">
                            <a className="item itemNav">TWEETS</a>
                            <a className="item itemNav">PEOPLES</a>
                        </div>

                        <div id="searchResult"/>
                    </FadeIn>
                );
            }
        }
        else {
            return (
                <div>
                    <h1>Search EVERYTHING</h1>
                </div>
            );
        }
    }

    render() {
        return (
            <FadeIn>
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        <SearchBar ParentSearchTweetsData={this.searchTweetsData}/>
                        <br/>
                        <center>
                            {this.isSearched(this.state.isSearch)}
                        </center>
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Search_Page;
