import React, {
  Component
} from 'react';
import _ from 'underscore';
import Grid from './Grid';
import './App.css';
import io from 'socket.io-client';


// Socket connenction
var socket = io.connect('http://localhost:4004');



class App extends Component {

  constructor() {
    super();

    this.numShips = 3;
    this.cols = 10;
    this.rows = 10;

    this.state = {
      userCount: 0,
      boats: [],
      boms: [],
      user: [],
      userName: null,
      opponentName: null
    }
  }

  componentDidMount() {
    var that = this;
    if (this.state.boats.length === 0) {
      this.generateBoats();
    }

    socket.on('newUser', function(data) {
      that.setState({userCount: data});
    });

    socket.on('startGame', function(data) {
      that.setState({
        opponentName: data.opponentName,
        gameId: data.gameId
      });
    });
  }

  generateBoats() {

    // Add some random ships
    var _boats = [];
    var i = 0;
    while (_boats.length < this.numShips && i < 100) {
      // x 
      var x = _.random(0, this.rows - 1);
      // y 
      var y = _.random(0, this.cols - 1);

      if (!this.cellHasBoat(x, y)) { // Not already one of the ships
        _boats[i] = {
          x: x,
          y: y
        };
      }
      i++;
    }
    this.setState({
      boats: _boats
    });
  }

  saveBoats() {
    socket.emit('saveUser', {
      boats: this.state.boats,
      userName: this.state.userName
    });
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

  onSubmitUserName = () => (event) => {
    event.preventDefault();
    var userName = event.target.userName.value.trim();
    this.setState({userName:userName}, function() {
      this.saveBoats()
    });
  }

  onJoinGame = (userName) => (event) => {
    socket.emit('joinGame', userName)
  }

  render() {

    if (this.state.userName === null) {
      return <form onSubmit={this.onSubmitUserName()} className="userName">
        <label>Please enter your username</label>
        <input type="text" name="userName" />
        <button type="submit">Start!</button>
      </form>
    }

    if (this.state.opponentName !== null) {
      var joinGameOrOpponentName = <p>Opponent: {this.state.opponentName}</p>
    } else {
      var joinGameOrOpponentName = <button onClick={this.onJoinGame(this.state.userName)}>Join Game!</button>
    }

    return <div>
      <h1>user: {this.state.userName}</h1>
      <div>
        <p>{this.state.userCount}</p>
      </div>
      <div>
        {joinGameOrOpponentName}
      </div>
      <Grid _id="Player" boats={this.state.boats} />
      <Grid _id="Enemy" boats={[]} />
    </div>
  }
}




export default App;