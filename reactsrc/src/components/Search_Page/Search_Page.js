import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact"
import './Search_Page.css';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Load another component
import SearchBar from "../Search_Bar/Search_Bar";
import TweetResult from "../Search_Result/Tweet_Result/Tweet_Result";

class Search_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetData: '',
            isSearch: false,
            searchValue: ''
        };
        this.searchTweetsData = this.searchTweetsData.bind(this);
        this.isSearched = this.isSearched.bind(this);
    }

    componentWillMount() {
        if(this.props.searchData){
            this.setState({
                tweetData: this.props.searchData.searchData,
                isSearch: true,
                searchValue: this.props.searchData.searchValue
            });
        }
    }

    searchTweetsData(searchValue) {
        axios.get('/api/users/searchByTweets/' + searchValue)
            .then(res => {
                this.setState({
                    tweetData: res.data,
                    isSearch: true,
                    searchValue: searchValue
                });
                this.props.history.replace({
                    pathname: '/home/search/',
                    search: searchValue.replace(' ', '-'),
                    state: {
                        searchData: res.data,
                        searchValue: searchValue
                    }
                })
            });
    }

    isSearched(isSearch) {
        if (isSearch) {
            if (this.state.tweetData.length === 0) {
                return (
                    <FadeIn>
                        <h1>DATA NOT FOUND BRO ...</h1>
                        <h2>{this.state.searchValue}</h2>
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

                        <TweetResult
                            tweetResult = {this.state.tweetData}
                            userId = {this.props.userId}
                            searchValue={this.state.searchValue}
                        />
                    </FadeIn>
                );
            }
        }
        else {
            return (
                <FadeIn>
                    <h1>Search Everything :)</h1>
                </FadeIn>
            );
        }
    }

    render() {
        return (
            <FadeIn>
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        <SearchBar
                            ParentSearchTweetsData={this.searchTweetsData}
                            searchValue={this.state.searchValue}
                        />
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
