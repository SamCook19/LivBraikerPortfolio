import React, { Component } from 'react';
import Menu from './navmenu';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="headerName">
                <h1>Liv Braiker</h1>
                </div>
                <div className="nav-menu">
                <Menu/>
            </div>
            </div>
            
        );
    }
}

export default Header;