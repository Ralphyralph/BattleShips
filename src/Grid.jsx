import React, { Component } from 'react';
import './App.css';

class Grid extends React.Component {

    constructor() {
        super();

        this.cols = 10;
        this.rows = 10;
        this.grid = [];
    }

    componentDidMount() {
        //console.log( this.props.boats );
        console.log(this.props._id + " Grid Printed");
    }
    
    printGrid() {

        var html = [];
        for (var i=0; i < this.rows; i++) {
            html.push(<tr>{this.printRow()}</tr>)
        }

        return html;
    }

    printRow() {

        var html = [];
        for (var i=0; i < this.cols; i++) {
            html.push(<Cell />)
        }
        return html;
    }

    render() {
        return <table className="grid">
            <tbody>{this.printGrid()}</tbody>
        </table>;
    }
}

class Cell extends React.Component {

    render() {
        return <td>&nbsp;</td>;
    }
}

export default Grid;