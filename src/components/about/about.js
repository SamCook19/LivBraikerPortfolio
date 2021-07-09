import React, { Component } from 'react';
import Header from '../navigation/header';

class About extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="about-body">
                    about
                </div>
            </div>
            </div>
        );
    }
}

export default About;