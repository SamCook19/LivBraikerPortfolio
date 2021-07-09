import React, { Component } from 'react';
import Header from '../navigation/header';

class Illustration extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="illustration-body">
                    illustrations
                </div>
            </div>
            </div>
        );
    }
}

export default Illustration;