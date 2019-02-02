import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

import './App.css';
import TMViewer from './components/TMViewer';
import TMCreator from './components/TMCreator';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {path: window.location.pathname}
  }
  render() {
    return (
      <div className="App">
        <Button.Group>
          <Button onClick={() => this.setState({path: '/view'})} active={this.state.path !== '/create'}>View</Button>
          <Button onClick={() => this.setState({path: '/create'})} active={this.state.path === '/create'}>Create</Button>
        </Button.Group>
        <div style={{display: this.state.path === '/create' ? '' : 'none'}}>
          <TMCreator />
        </div>
        <div style={{display: this.state.path !== '/create' ? '' : 'none'}}>
        <Button
          icon='x'
          onClick={() => this.setState({path: '/create'})}
          style={{
            zIndex: 50,
            top: 0,
            left: 0,
            position: 'absolute',
          }}
        />
          <TMViewer />
        </div>
      </div>
    );
  }
}

export default App;
