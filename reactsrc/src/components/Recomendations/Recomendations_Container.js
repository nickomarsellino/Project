import React, {Component} from "react";
import profile from '../../daniel.jpg';
import axios from 'axios';
import './Recomendations_Container.css'
import RecomendationComponent from './Recomendation_Component'


class Recomendations_Container extends Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentWillUpdate(){

    }

    componentWillMount() {

    }

    render() {

        return (
            <section className="RecomendationContainer">
               <RecomendationComponent/>
                <RecomendationComponent/>
                <RecomendationComponent/>
                <RecomendationComponent/>
                <RecomendationComponent/>
            </section>
        );
    }
}

export default Recomendations_Container;
