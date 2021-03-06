import React, { Component } from 'react';
import Header from '../navigation/header';
import AboutComponent from './aboutcomponent';

class About extends Component {
    
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="about-body">
                    <div className="about-header-container">
                    <h1 className="display-1">About</h1>
                    </div>
                    <AboutComponent />
                </div>
            </div>
            </div>
        );
    }
}

export default About;