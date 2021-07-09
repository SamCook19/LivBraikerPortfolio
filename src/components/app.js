import React, { Component } from 'react';
import Layout from './Layout';
import "firebase/auth";


export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Layout />
      </div>
    );
  }
}
