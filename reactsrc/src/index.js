import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

//load another component
import Register from './components/Form_Register/Register'
import SignIn from './components/Form_SignIn/SignIn'
import Home from './components/HomePage/Home'
import Profile from './components/Form_editProfile/Edit_Profile'

//import css data
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/'           component={App} />
            <Route path='/register'         component={Register} />
            <Route path='/signin'           component={SignIn} />
            <Route path='/home'             component={Home} />
        </div>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
