import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Menu from './navmenu';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="headerName">
                <NavLink to="/" activeClassName="nav-link-active"><h1 class="display-1">Liv Braiker</h1></NavLink>
                </div>
                <div className="nav-menu">
                <Menu/>
            </div>
            </div>
            
        );
    }
}

export default Header;