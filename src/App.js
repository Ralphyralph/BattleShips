import React, { Component } from 'react';
import _ from 'underscore';
import Grid from './Grid';
import './App.css';


class App extends Component {

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

  }

  componentDidMount() {

    if (this.state.boats.length === 0) {
      this.generateBoats();
    }
  }

  generateBoats() {

    // Add some random ships
    var _boats = [];
    var i = 0;
    while (_boats.length < this.numShips && i < 100) {
        // x 
        var x = _.random(0, this.rows-1);
        // y 
        var y = _.random(0, this.cols-1);

        if (!this.cellHasBoat(x, y)) { // Not already one of the ships
          _boats[i] = {x:x,y:y};
        }
        i++;
    }
    this.setState({boats:_boats });
}

cellHasBoat(x, y) {
    console.log("Has boat?");
    var flag = false;
    _.each(this.state.boats, function (item, i) {
        if (item.x === x && item.y === y) {
          console.log("yes, has!");
          flag = true;
        }
    });
    return flag;
}

  render() {
    return <div>
      <Grid _id="Player" boats={this.state.boats} />
      <Grid _id="Enemy" boats={[]} />
    </div>;
  }
}




export default App;
