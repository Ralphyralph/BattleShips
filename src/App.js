import React, { Component } from 'react';
import _ from 'underscore';
import DB_CONFIG from './Config';
import firebase from 'firebase/app';
import 'firebase/database';
import Grid from './Grid';
import './App.css';


class App extends React.Component {

  constructor() {
    super();

    this.numShips = 3;

    this.cols = 10;
    this.rows = 10;

    this.state = {
      boats: [],
      boms: [],
      user: []
    }

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('test');
  }

  componentDidMount() {

    if (this.state.boats.length === 0) {
      this.generateBoats();
    }
  }

  cellHasBoat(x,y) {
    var flag = false;
    _.each(this.state.boats, function(item,i) {
      if (item.x === x && item.y === y) {
        flag = true;
      }

    });
    return flag;
  }

  generateBoats() {

    // Add some random ships
    var i = 0;
    while (this.state.boats.length < this.numShips && i < 100) {
      // x 
      var x = _.random(0, this.rows);
      // y 
      var y = _.random(0, this.cols);

      if (!this.cellHasBoat(x,y)) { // Not already one of the ships
        this.state.boats.push({x:x,y:y});
      }
    i++;
    }
  }

  render() {
    return <div>
      <Grid _id="Player" boats={this.state.boats} />
      <Grid _id="Enemy" boats={[]} />
    </div>;
  }
}




export default App;
