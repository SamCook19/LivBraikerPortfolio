import React, { Component } from 'react';
import Header from '../navigation/header';
import OtherProjects from './otherprojects';

class Other extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="other-body">
                    <h1>Other Media Projects</h1>
                    <OtherProjects />
                </div>
            </div>
            </div>
        );
    }
}

export default Other;