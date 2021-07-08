import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Layout extends Component {
  
    render() {
      return (
        <div className='site-container'>
          
          <div className='route-container'>
          <Router>
          <AuthProvider>
          <Switch>
          </Switch>
          </AuthProvider>
          </Router>
        </div>
        
        </div>
    
          
       
    );
  }
}