import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';
import './footer.css';

class Footer_Bar extends React.Component {
    render(){
        return(
            <Footer color="stylish-color" className="page-footer font-small pt-4 mt-4">
                <div className="text-center">
                    <ul className="list-unstyled list-inline">
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-fb mx-1"><i className="fa fa-facebook"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-tw mx-1"><i className="fa fa-twitter"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-gplus mx-1"><i className="fa fa-google-plus"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-li mx-1"><i className="fa fa-linkedin"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-dribbble mx-1"><i className="fa fa-dribbble"> </i></a></li>
                    </ul>
                    <Container fluid >
                        &copy; {(new Date().getFullYear())} Copyright: <a href=""> Lil Uzi Vert </a>
                    </Container>
                </div>
            </Footer>
        );
    }
}

export default Footer_Bar;
