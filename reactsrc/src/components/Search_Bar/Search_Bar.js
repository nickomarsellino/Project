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

    componentWillMount() {
        this.resetComponent();

        axios.get('/api/users/allUsers/')
            .then(res => {
                source = res.data;
                console.log(JSON.stringify(res.data[1]).replace('username', 'title'));
            });
    }

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

    handleResultSelect = (e, {result}) => this.setState({value: result.username})

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.username);

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    };

    search() {
        console.log("ENter");
    }

    render() {
        return (
            <div id="SearchBoxContainer">

                <Search
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
                />
            </div>
        )
    }
}

export default Search_Bar;