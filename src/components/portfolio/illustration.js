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
                    <h1>Illustrations/Prints, Watercolor</h1>
                    <h2>DIGITAL WORK</h2>
                    {/* Insert Digital Work Component */}
                    <h2>TRADITIONAL WORK</h2>
                    {/* Insert Trad Work Componentw */}
                </div>
            </div>
            </div>
        );
    }
}

export default Illustration;