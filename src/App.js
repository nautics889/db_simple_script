import React from 'react';
import logo from './logo.svg';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';

function Output(props) {
  return (
    <div>
      output: {props.output}
    </div>
  )
}

function Input(props) {
  return (
    <div>
      input
    </div>
  )
}

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '...',
      toOutput: '...'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  render() {
    return (
      <div>
        <Output output={this.state.toOutput}></Output>
        <KeyboardEventHandler
          handleKeys={['enter']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => this.setState({toOutput: this.state.userInput})} />
        <input type="text" defaultValue={this.state.userInput} onChange={this.handleChange} />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Console />
    </div>
  );
}

export default App;
