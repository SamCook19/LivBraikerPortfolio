import React, { Component } from 'react';
import Header from '../navigation/header';

class Conceptual extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="conceptual-body">
                    conceptual
                </div>
            </div>
            </div>
        );
    }
}

export default Conceptual;