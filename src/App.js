import React, {Component} from 'react';

import './App.css';

import Header from './containers/Header';
import Footer from './containers/Footer';
import Content from './containers/Content';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <Content />
        <Footer />  
      </div>
    );
  }  
}

export default App;

