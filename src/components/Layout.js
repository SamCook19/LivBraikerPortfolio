import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext"
import Homepage from './homepage/homepage.js';
import Illustration from './portfolio/illustration';
import About from './about/about.js';
import Contact from './contact/contact.js';
import Other from './portfolio/other.js';
import Conceptual from './portfolio/conceptual.js';
import Manager from './manager/manager.js';
import Login from './auth/login.js';
import Logout from './auth/logout.js';
import NoMatch from './otherpages/no-match';
import PrivateRoute from './PrivateRoute.js';

export default class Layout extends Component {
  
    render() {
      return (
        <div className='site-container'>
          
          <div className='route-container'>
          <Router>
            <AuthProvider>
          <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/home" component={Homepage}/>
              <Route exact path="/illustration" component={Illustration}/>
              <Route exact path="/othermedia" component={Other}/>
              <Route exact path="/conceptual" component={Conceptual}/>
              <Route exact path="/contact" component={Contact}/>
              <Route exact path="/about" component={About}/>
              <PrivateRoute exact path="/manager" component={Manager}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute path='/logout' component={Logout}/>
              <Route component={NoMatch} />
          </Switch>
          </AuthProvider>
          </Router>
        </div>
        
        </div>
    
          
       
    );
  }
}