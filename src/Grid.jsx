import React, { Component } from 'react';
import _ from 'underscore';
import './App.css';

class Grid extends Component {

    constructor() {
        super();

        this.cols = 10;
        this.rows = 10;
    }
    
    printGrid() {

        console.log(this.props.boats);

        var grid = [];
        for (var i=0; i < this.rows; i++) {
            var row = [];
            for (var j=0; j < this.cols; j++) {
                var status = this.cellStatus(i,j);
                row.push(<Cell key={(i/10)+j} x={j} y={i} status={status} />);
            }
            grid.push(<tr key={"row_"+i}>{row}</tr>);
        }
        return grid;
    }

    cellStatus (x,y) {
       
        for (var i=0; i < this.props.boats.length; i++) {
             if (this.props.boats[i].x == x && this.props.boats[i].y == y) {
                return "boat";
            }   
        };

        return "empty";
    }

    render() {
        return <table className="grid">
            <tbody>{this.printGrid()}</tbody>
        </table>;
    }
}

class Cell extends Component {

    render() {
        return <td className={this.props.status}>{this.props.x}{this.props.y}</td>;
    }
}

export default Grid;