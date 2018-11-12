import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact";
import './Search_Page.css';
import axios from 'axios';

//Load another component
import SearchBar from "../Search_Bar/Search_Bar";
import TweetResult from "../Search_Result/Tweet_Result/Tweet_Result_Container";
import UserCardContainer from '../UserCardContainer/UserCardContainer'

class Search_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetSearch: '',
            tweetSearchLength: '',
            userSearch: '',
            userSearchLength: '',
            isSearch: false,
            searchValue: '',
            isTweetSearch: '',
            isUserSearch: '',
            userLoginFollowingData: ''
        };
        this.searchTweetsData = this.searchTweetsData.bind(this);
        this.isSearched = this.isSearched.bind(this);
        this.handleItemClicked = this.handleItemClicked.bind(this);
    }

    componentWillMount() {
        if (this.props.searchData) {
            this.setState({
                tweetSearch: this.props.searchData.searchTweetsData,
                tweetSearchLength: this.props.searchData.tweetSearchLength,
                userSearch: this.props.searchData.searchUsersData,
                isSearch: true,
                searchValue: this.props.searchData.searchValue
            });

            if(this.props.searchData.isTweetSearch){
                this.setState({isTweetSearch: true});
            }

            if(this.props.searchData.isUserSearch){
                this.setState({isUserSearch: true});
            }
        }
    }

    searchTweetsData(searchValue) {
        axios.all([
            axios.get('/api/tweet/searchByTweets/' + searchValue +'?perPage=5&page=1'),
            axios.get('/api/users/searchByUser/' + searchValue)
        ])
            .then(axios.spread((searchByTweetsRes, searchByUsersRes) => {
                this.setState({
                    isSearch: true,
                    searchValue: searchValue
                });
                this.props.history.replace({
                    pathname: '/home/search/',
                    search: searchValue.replace(' ', '-'),
                    state: {
                        searchTweetsData: searchByTweetsRes.data.docs,
                        tweetSearchLength: searchByTweetsRes.data.total,
                        searchValue: searchValue,
                        searchUsersData: searchByUsersRes.data,
                        isTweetSearch: true
                    }
                })
            }));
    }

    handleItemClicked(item) {
        if (item === "Tweets") {
            this.props.history.replace({
                pathname: '/home/search/',
                search: this.state.searchValue.replace(' ', '-'),
                state: {
                    searchTweetsData: this.state.tweetSearch,
                    tweetSearchLength: this.state.tweetSearchLength,
                    searchValue: this.state.searchValue,
                    searchUsersData: this.state.userSearch,
                    isTweetSearch: true,
                    isUserSearch: false
                }
            })
        }
        else if (item === "Peoples") {
            this.props.history.replace({
                pathname: '/home/search/',
                search: this.state.searchValue.replace(' ', '-'),
                state: {
                    searchTweetsData: this.state.tweetSearch,
                    tweetSearchLength: this.state.tweetSearchLength,
                    searchValue: this.state.searchValue,
                    searchUsersData: this.state.userSearch,
                    isUserSearch: true,
                    isTweetSearch: false
                }
            })
        }
    }

    isSearched(isSearch) {
        if (isSearch) {
            if (this.state.tweetSearch.length === 0 && this.state.userSearch.length === 0) {
                if(this.state.isTweetSearch){
                    return (
                        <FadeIn>
                            <div id="navSearchDetail" className="ui three item menu">
                                <a className="item itemNav"
                                   onClick={() => this.handleItemClicked("Tweets")}>
                                    TWEETS
                                </a>
                                <a className="item itemNav"
                                   onClick={() => this.handleItemClicked("Peoples")}>
                                    PEOPLES
                                </a>
                            </div>
                            <br/>
                            <h1>TWEET NOT FOUND BRO ...</h1>
                            <h2>"{this.state.searchValue}"</h2>
                        </FadeIn>
                    );
                }
                else{
                    return (
                        <FadeIn>
                            <div id="navSearchDetail" className="ui three item menu">
                                <a className="item itemNav"
                                   onClick={() => this.handleItemClicked("Tweets")}>
                                    TWEETS
                                </a>
                                <a className="item itemNav"
                                   onClick={() => this.handleItemClicked("Peoples")}>
                                    PEOPLES
                                </a>
                            </div>
                            <br/>
                            <h1>USERS NOT FOUND BRO ...</h1>
                            <h2>"{this.state.searchValue}"</h2>
                        </FadeIn>
                    );
                }
            }

            else {
                if(this.state.isTweetSearch){
                    if(this.state.tweetSearch.length === 0){
                        return (
                            <FadeIn>
                                <div id="navSearchDetail" className="ui three item menu">
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Tweets")}>
                                        TWEETS
                                    </a>
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Peoples")}>
                                        PEOPLES
                                    </a>
                                </div>
                                <br/>
                                <h1>TWEET NOT FOUND BRO ...</h1>
                                <h2>"{this.state.searchValue}"</h2>
                            </FadeIn>
                        );
                    }

                    else {
                        return (
                            <FadeIn>
                                <div id="navSearchDetail" className="ui three item menu">
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Tweets")}>
                                        TWEETS
                                    </a>
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Peoples")}>
                                        PEOPLES
                                    </a>
                                </div>

                                <TweetResult
                                    tweetSearchLength={this.state.tweetSearchLength}
                                    history={this.props.history}
                                    tweetResult={this.state.tweetSearch}
                                    userId={this.props.userId}
                                    searchValue={this.state.searchValue}
                                />
                            </FadeIn>
                        );
                    }
                }

                if(this.state.isUserSearch){
                    if(this.state.userSearch.length === 0){
                        return (
                            <FadeIn>
                                <div id="navSearchDetail" className="ui three item menu">
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Tweets")}>
                                        TWEETS
                                    </a>
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Peoples")}>
                                        PEOPLES
                                    </a>
                                </div>
                                <br/>
                                <h1>USERS NOT FOUND BRO ...</h1>
                                <h2>"{this.state.searchValue}"</h2>
                            </FadeIn>
                        );
                    }
                    else {
                        return (
                            <FadeIn>
                                <div id="navSearchDetail" className="ui three item menu">
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Tweets")}>
                                        TWEETS
                                    </a>
                                    <a className="item itemNav"
                                       onClick={() => this.handleItemClicked("Peoples")}>
                                        PEOPLES
                                    </a>
                                </div>

                                <UserCardContainer
                                    located="inSearchPage"
                                    userSearch={this.state.userSearch}
                                    history={this.props.history}
                                />

                            </FadeIn>
                        );
                    }
                }

            }
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

                            <FadeIn>
                                <div id="searchResult"/>
                            </FadeIn>
                        </center>
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Search_Page;
