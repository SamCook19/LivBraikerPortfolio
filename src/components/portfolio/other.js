import React, { Component } from 'react';
import Header from '../navigation/header';
import OtherProjects from './otherprojects';
import TarotCards from './tarot';

class Other extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="other-body">
                    <div className="pageheading">
                    <h1 className="display-2">Other Media Projects</h1>
                    </div>
                    <TarotCards />
                    <OtherProjects />
                </div>
            </div>
            </div>
        );
    }
}

export default Other;