import React from 'react';
import logo from './logo.svg';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';

function OutputLine(props) {
  return (
    <p>{props.content}</p>
  )
}

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '...',
      outputArray: [<OutputLine content='initial command'/>, ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      userInput: <OutputLine content={e.target.value}/>
    });
  }

  render() {
    return (
      <div>
        {this.state.outputArray}
        <KeyboardEventHandler
          handleKeys={['enter']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => {
            let newOutput = [...this.state.outputArray, this.state.userInput];
            this.setState({outputArray: newOutput});
          }} />
        <div>
          <input type="text" defaultValue={this.state.userInput} onChange={this.handleChange} />
        </div>
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
