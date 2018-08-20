import React, {Component} from "react";
import _ from 'lodash'
import faker from 'faker'
import './Search.css';
import profile from '../../daniel.jpg';
import {Search, Grid, Header, Segment} from 'semantic-ui-react';

const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.image.people(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))


class Search_Bar extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

    handleResultSelect = (e, {result}) => this.setState({value: result.title})

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    render() {
        const {isLoading, value, results} = this.state

        return (
            <center>
                <Grid id="SearchBoxContainer">

                    <Grid.Column width={20}>
                        <Search
                            placeholder = "Search"
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                            results={results}
                            value={value}
                        />
                    </Grid.Column>

                </Grid>
            </center>
        )
    }
}

export default Search_Bar;