import React, { Component } from 'react';
import Grid from './Grid';
import './App.css';

function generateMyBoats() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

var myBoats = generateMyBoats();

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return <div>
      <Grid _id="Player" boats={myBoats} />
      <Grid _id="Enemy" boats={myBoats} />
    </div>;
  }
}




export default App;
