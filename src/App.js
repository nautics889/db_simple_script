import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';

function OutputLine(props) {
  return (
    <p>{props.content}</p>
  )
}

function File(props) {
  let toOutput;
  switch (props.command) {
    case 'cat':
      toOutput = props.content;
      break;
    default:
      toOutput = props.name;
  }
  return (
    <p>{toOutput}</p>
  )
}

const fileMap = new Map();
fileMap.set('gluck.txt', {
  name: 'gluck.txt',
  content: 'new line \n'
});
fileMap.set('bar.txt', {
  name: 'bar.txt',
  content: 'i am bar \n'
});

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

    if (splittedCommand[0] === 'cat') {
      const file = fileMap.get(splittedCommand[1]);
      if (file) {
        this.setState({
          userInput: <File name={file.name} content={file.content} command='cat'/>
        });
      }
      else {
        this.setState({
          userInput: <OutputLine content={`user: ${e.target.value}`}/>
        });
      }
    }
    else {
      this.setState({
        userInput: <OutputLine content={`user: ${e.target.value}`}/>
      });
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

function App() {
  return (
    <div className="App">
      <Console />
    </div>
  );
}

export default App;
