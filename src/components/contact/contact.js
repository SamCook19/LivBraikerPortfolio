import React, { Component } from 'react';
import Header from '../navigation/header';

import ContactForm from './contactform';

class Contact extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                <div className="header">
                    <Header />
                </div>
                
                <div className="contact-body">
                    <ContactForm />
                </div>
            </div>
            </div>
        );
    }
}

export default Contact;