import React, {Component} from "react";
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Recomendations_Container.css'
import RecomendationComponent from './Recomendation_Component'


class Recomendations_Container extends Component {

    constructor() {
        super();
        this.state = {
            recomendationData: []
        };
    }

    componentWillUpdate(){

    }

    componentWillMount() {
        axios.get('/api/users/allUsers', {})
            .then(res => {
                this.setState({
                    recomendationData: res.data
                });
            });
    }

    render() {
        return (
            <section className="RecomendationContainer">
                {this.state.recomendationData.map(recomendation =>
                    <RecomendationComponent
                        history={this.props.history}
                        recomendation={recomendation}
                    />
                )}
            </section>
        );
    }
}

export default Recomendations_Container;
