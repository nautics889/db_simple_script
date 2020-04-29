import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../App.css';
import OutputLine from '../components/OutputLine';
import fileMap from '../mappers/fileMap';
import commandHandlerMap from '../mappers/commandHandlerMap';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawUserInput: '...',
      handledUserInput: undefined,
      outputArray: [<OutputLine content='Welcome to my web-terminal!'/>, 
                    <OutputLine content="At present I know only following commands: cat, ls, cd"/>],
      files: fileMap,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({rawUserInput: e.target.value});

    let splittedCommand = e.target.value.split(' ');

    let command = splittedCommand[0];
    let handler = commandHandlerMap.get(command);
    
    if (handler) {
      this.setState({
        handledUserInput: handler(splittedCommand[1])
      })
    }
    else {
      this.setState({
        handledUserInput: <OutputLine content={`user: command not found: ${e.target.value}`}/>
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.outputArray}
        <KeyboardEventHandler
          handleKeys={['enter']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => {
            let newOutput = [...this.state.outputArray, this.state.handledUserInput];
            this.setState({outputArray: newOutput});
          }} />
        <KeyboardEventHandler
          handleKeys={['tab']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => {
            let availableCommands = Array.from(commandHandlerMap.keys());
            let suitableCommands = availableCommands.filter((el, index, arr) => { if (el.startsWith(this.state.rawUserInput)) { return el; } }, this);
            if (suitableCommands == 0) {
              return
            } else if (suitableCommands.length == 1) {
              document.getElementById("userInput").value = suitableCommands;
            } else if (suitableCommands.length > 1) {
              this.setState({
                outputArray: [...this.state.outputArray, <OutputLine content={suitableCommands.join('        ')}/>]
              });
            }
          }} />
        <div>
          <label for="userInput">guest@nautics-desktop ~/ % </label>
          <input id="userInput" type="text" defaultValue={this.state.rawUserInput} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default Console;
