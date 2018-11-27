import React, {Component} from "react";
import _ from 'lodash'
import './Search.css';
import {Search} from 'semantic-ui-react';

class Search_Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            value: '',
            searchValue: "Search",
            results: [],
            sourceData : []
        };
    }

    componentWillMount() {
        if(this.props.searchValue){
            this.setState({
                searchValue: this.props.searchValue,
            })
        }
    }

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})
        setTimeout(() => {
            this.setState({
                isLoading: false,
            })
        }, 300)
    };

    search() {
        this.props.ParentSearchTweetsData(this.state.value)
    }


    render() {
        return (
            <div>
                <Search
                    id="SearchBoxContainer"
                    placeholder={this.state.searchValue}
                    size="big"
                    loading={this.state.isLoading}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    value={this.state.value}
                    showNoResults={false}
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            this.search();
                        }
                    }}
                />
            </div>
        )
    }
}

export default Search_Bar;
