import React from 'react';
import File from '../components/File.js';
import OutputLine from '../components/OutputLine';
import fileMap from './fileMap.js';

const commandHandlerMap = new Map();
commandHandlerMap.set('cat', (...args) => {
  const file = fileMap.get(args[0]);
  if (file) {
    return <File name={file.name} content={file.content} command='cat'/>
  }
  return <OutputLine content={`cat: ${args[args.length - 1]}: No such file or directory`}/>
})
commandHandlerMap.set('ls', (...args) => {
  let files = [];
  fileMap.forEach((file) => {
    files.push(<File name={file.name} content={file.content} command='ls'/>);
  })
  return files;
})

export default commandHandlerMap;
