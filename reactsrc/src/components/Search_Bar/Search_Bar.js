import React, {Component} from "react";
import _ from 'lodash'
import './Search.css';
import {Search} from 'semantic-ui-react';
import axios from "axios/index";

let source ;

class Search_Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            value: '',
            results: [],
            sourceData : []
        };
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
            <div id="SearchBoxContainer">

                <Search
                   // autoFocus
                    placeholder="Search"
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
                    onFocus={this.props.isBlur}
                />
            </div>
        )
    }
}

export default Search_Bar;
