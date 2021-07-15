import React, { Component } from 'react';
import Header from '../navigation/header';
import Digital from './digital';
import Traditional from './traditional';

class Illustration extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                <div className="illustration-body">
                    <div className="pageheading">
                    <h1 className="display-2">Illustrations<small class="text-muted">/Prints, Watercolor</small></h1>
                    </div>
                    <div className="illustration-spacer"></div>
                    <div className="digital-container">
                        <div className="illustration-heading"><h1><small class="text-muted">DIGITAL WORK</small></h1></div>
                            <Digital />
                    </div>
                    <div className="illustration-spacer"></div>
                    <div className="tradtional-container">
                        <div className="illustration-heading"><h1><small class="text-muted">TRADITIONAL WORK</small></h1></div>
                            <Traditional />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Illustration;