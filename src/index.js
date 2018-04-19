import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }

}

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };

    this.handleReset = this.handleReset.bind(this);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />

    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.isValidMove(i)) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
    } else {
      return;
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  isValidMove(i) {
    if (this.state.squares[i] === null) {
      return true;
    } else return false;
  }


  render() {
    // const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O') ;
    const winner = isThereWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next Player:' + (this.state.isNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    );
  }

  // const initialState = {
  //   squares: Array(9).fill(null),
  //   xIsNext: true,
  // };

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
    // this.setState({
    //   squares: Array(9).fill(null),
    //   xIsNext: true,
    // });
  }

}

function isThereWinner(squares) {
  // console.log(squares);
  const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
  ];
  // console.log(squares);

  let letters = [];
  let winningLetter = null;

  winCombos.forEach(function(row) {
    row.forEach(function(idx) {
      letters.push(squares[idx])
    });
    if (letters.every((letter) => letter === 'X')){
      winningLetter = 'X';
      return;
    } else if (letters.every((letter) => letter === 'O')){
      winningLetter = 'O';
      return;
    }
    letters = [];
  });

  if (winningLetter === null) {
    return null;
  } else {
    return winningLetter;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
