import React, { Component } from 'react';
import Header from '../navigation/header';
import ConceptualProjects from './conceptualprojects';
import GalleryEdit from './edit/conceptual-edit';

class Conceptual extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="conceptual-body">
                    <div className="pageheading">
                    <h1 className="display-2">Conceptual Projects</h1>
                    </div>
                    <ConceptualProjects />
                    <div>
                        <GalleryEdit />
                    </div>
                </div>
                
            </div>
            </div>
        );
    }
}

export default Conceptual;