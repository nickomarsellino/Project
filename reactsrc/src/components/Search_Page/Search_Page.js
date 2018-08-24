import React, {Component} from "react";
import FadeIn from 'react-fade-in';
import {Container} from "mdbreact"


//Load another component
import Search_Bar from "../Search_Bar/Search_Bar";

class Search_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            value: '',
            results: [],
            sourceData : []
        };
    }
    render() {
        return (
            <FadeIn>
                <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                    <div>
                        <Search_Bar/>
                    </div>
                </Container>
            </FadeIn>
        )
    }
}

export default Search_Page;