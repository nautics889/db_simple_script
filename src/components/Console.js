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

    this.setUserInputElemRef = element => {
      this.userInputElem = element;
    };
    this.handleChange = this.handleChange.bind(this);
    this.processInput = this.processInput.bind(this);
  }

  processInput(userInput) {
    let splittedCommand = userInput.split(' ');

    let command = splittedCommand[0];
    let handler = commandHandlerMap.get(command);
    
    if (handler) {
      this.setState({
        handledUserInput: handler(splittedCommand[1])
      })
    }
    else {
      this.setState({
        handledUserInput: <OutputLine content={`user: command not found: ${userInput}`}/>
      })
    }
  }

  handleChange(e) {
    this.setState({rawUserInput: e.target.value});
    this.processInput(e.target.value);
  }

  render() {
    return (
      <div>
        {this.state.outputArray}
        <KeyboardEventHandler
          handleKeys={['enter']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => {
            let newOutput = [...this.state.outputArray, `guest@nautics-desktop ~/ % ${this.userInputElem.value}`, this.state.handledUserInput];
            this.setState({outputArray: newOutput});
          }} />
        <KeyboardEventHandler
          handleKeys={['tab']}
          handleFocusableElements={true}
          onKeyEvent={(key, e) => {
            e.preventDefault();

            let availableCommands = [...commandHandlerMap.keys(), ...fileMap.keys()];
            let suitableCommands = availableCommands.filter((el, index, arr) => {
              let wordToComplete = this.state.rawUserInput.split(" ").pop();
              if (el.startsWith(wordToComplete)) { return el; } 
            }, this);
            if (suitableCommands == 0) {
              return
            } else if (suitableCommands.length == 1) {
              let currentSplittedInput = this.state.rawUserInput.split(" ");
              let completedInput;
              if (currentSplittedInput.length > 1) {
                completedInput = `${currentSplittedInput.slice(0, -1).join(" ")} ${suitableCommands.pop()}`
              } else {
                completedInput = suitableCommands.pop();
              }
              this.userInputElem.value = completedInput;
              this.processInput(completedInput);
            } else if (suitableCommands.length > 1) {
              this.setState({
                outputArray: [...this.state.outputArray, <OutputLine content={suitableCommands.join('        ')}/>]
              });
            }
          }} />
        <div>
          <label for="userInput">guest@nautics-desktop ~/ % </label>
          <span class="input-wrapper">
            <input id="userInput" type="text" ref={this.setUserInputElemRef} defaultValue={this.state.rawUserInput} onChange={this.handleChange} />
          </span>
        </div>
      </div>
    )
  }
}

export default Console;
