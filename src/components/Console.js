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
      userInput: '...',
      outputArray: [<OutputLine content='initial command'/>, 
                    <OutputLine content='second command'/>],
      files: fileMap,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let splittedCommand = e.target.value.split(' ');

    let command = splittedCommand[0];
    let handler = commandHandlerMap.get(command);
    
    if (handler) {
      this.setState({
        userInput: handler(splittedCommand[1])
      })
    }
    else {
      this.setState({
        userInput: <OutputLine content={`user: ${e.target.value}`}/>
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

export default Console;
