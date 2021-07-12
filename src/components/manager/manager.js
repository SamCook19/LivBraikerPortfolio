import React, { Component } from 'react';
import Header from '../navigation/header';

class Manager extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="manager-body">
                    <div className="add-featured">
                        Featured
                    </div>
                    <div className="add-illustration">
                        Illustration
                    </div>
                    <div className="add-othermedia">
                        Other Media
                    </div>
                    <div className="add-conceptual">
                        Conceptual
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Manager;