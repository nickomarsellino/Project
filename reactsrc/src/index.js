import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

//load another component
import Register from './components/Authentication/Form_Register/Register'
import SignIn from './components/Authentication/Form_SignIn/SignIn'
import Home from './components/HomePage/Home'

//import css data
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/register' component={Register}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/home' component={Home}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
