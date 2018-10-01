import React, {Component} from "react";
import axios from 'axios';
import './Tweet_Result.css';
import FadeIn from 'react-fade-in';
import InfiniteScroll from "react-infinite-scroll-component";
import TweetResult from "./Tweet_Result_Component";


class Tweet_Result_Container extends Component {

    constructor() {
        super();
        this.state = {
            tweetResults: [],
            tweet: [],
            likes: null,
            black: "blackColor",
            modalDelete: false,
            hasMore: true,
            lengthData: '',
            pagesData: 1
        };

        this.getTweetSearch = this.getTweetSearch.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentWillMount() {
        this.getTweetSearch();

        this.setState({
            tweet: this.props.tweet,
        })

    }

    getTweetSearch() {
        this.setState({
            lengthData: this.props.tweetResult.length,
            tweetResults: this.props.tweetResult
        });
    }


    fetchMoreData() {
        if (this.state.lengthData === this.props.tweetSearchLength) {
            this.setState({hasMore: false});
        }
        else {
            setTimeout(() => {
                axios.get('/api/tweet/searchByTweets/' + this.props.searchValue + '?perPage=5&page=' + parseInt(this.state.pagesData + 1, 10))
                    .then(res => {
                        const joined = this.state.tweetResults.concat(res.data.docs);
                        this.setState({
                            tweetResults: joined,
                            lengthData: parseInt(this.state.lengthData + res.data.docs.length, 10)
                        });
                    });
            }, 1000);
        }
    }

    render() {
        return (
            <FadeIn>
                <InfiniteScroll
                    dataLength={this.state.lengthData}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    // loader={<img id="loadingGif" src={loading} alt="loading..."/>}
                >
                    <div style={{marginTop: "2%"}}>
                        {this.state.tweetResults.map(tweet =>
                            <TweetResult
                                resultData={tweet}
                                userId={this.props.userId}
                                history={this.props.history}
                                searchValue={this.props.searchValue}
                            />
                        )}
                    </div>
                </InfiniteScroll>
            </FadeIn>
        );
    }
}

export default Tweet_Result_Container;