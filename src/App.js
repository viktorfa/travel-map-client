import React, { Component } from 'react';
import './App.css';
import TMViewer from './components/TMViewer';
import TMCreator from './components/TMCreator';

class App extends Component {
  render() {
    return (
      <div className="App">
      {
        (window.location.pathname === '/create' && (
          <TMCreator />
        ))
        || (
          <TMViewer />
        )
      }
      </div>
    );
  }
}

export default App;
