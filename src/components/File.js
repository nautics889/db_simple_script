import React from 'react';

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

export default File;
