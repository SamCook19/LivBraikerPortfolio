import React, { Component } from 'react';

import Header from '../navigation/header';
import HomeGallery from './homegallery';


class Homepage extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                <div className="home-container">
                    <HomeGallery />
                    </div>
                <div className="homepage-container">
                
                </div>
                
                
            </div>
        );
    }
}

export default Homepage;