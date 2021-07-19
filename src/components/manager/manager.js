import React, { Component } from 'react';
import Header from '../navigation/header';
import firebase from '../../config/firebase';
import PortfolioItem from './portfolioitem';

const db = firebase.default.firestore()

class Manager extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            data: []
        }
    }

   
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="manager-body">
                    <button className="add-featured">
                        Featured
                    </button>
                    <button className="add-illustration">
                        Illustration
                    </button>
                    <button className="add-othermedia">
                        Other Media
                    </button>
                    <button className="add-conceptual">
                        Conceptual
                    </button>
                    <button className="add-about">
                        About
                    </button>
                    <div className="portfolio-items"></div>
                </div>
            </div>
            </div>
        );
    }
}

export default Manager;