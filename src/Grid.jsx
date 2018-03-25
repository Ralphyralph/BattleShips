import React, { Component } from 'react';
import _ from 'underscore';
import './App.css';

class Grid extends React.Component {

    constructor() {
        super();

        this.cols = 10;
        this.rows = 10;
    }
    
    printGrid() {

        //boats={this.props.boats}

        
        var grid = [];
        for (var i=0; i < this.rows; i++) {
            var row = [];
            for (var j=0; j < this.cols; j++) {
                var status = this.cellStatus(j,i);
                row.push(<Cell key={j} x={j} y={i} status={status} />);
            }
            grid.push(<tr key={j+i}>{row}</tr>);
        }
        return grid;
    }

    cellStatus (x,y) {

        console.log(this.props.boats.length);
       
        for (var i=0; i < this.props.boats.length; i++) {
             console.log(1);
             if (this.props.boats[i].x == x && this.props.boats[i].y == y) {
                console.log(2);
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

class Cell extends React.Component {



    render() {
        return <td className={this.props.status}>{this.props.x}{this.props.y}</td>;
    }
}

export default Grid;