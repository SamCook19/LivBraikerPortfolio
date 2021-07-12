import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Homepage from './homepage/homepage.js';
import Illustration from './portfolio/illustration';
import About from './about/about.js';
import Contact from './contact/contact.js';
import Other from './portfolio/other.js';
import Conceptual from './portfolio/conceptual.js';
import Manager from './manager/manager.js';

export default class Layout extends Component {
  
    render() {
      return (
        <div className='site-container'>
          
          <div className='route-container'>
          <Router>
          <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/home" component={Homepage}/>
              <Route exact path="/illustration" component={Illustration}/>
              <Route exact path="/othermedia" component={Other}/>
              <Route exact path="/conceptual" component={Conceptual}/>
              <Route exact path="/contact" component={Contact}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/manager" component={Manager}/>
          </Switch>
          </Router>
        </div>
        
        </div>
    
          
       
    );
  }
}