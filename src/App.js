import React from 'react';
import logo from './logo.svg';
import './App.css';

function Square (props){
  return(
    <button 
      className="square btn btn-outline-info" 
      onClick={() => props.onLik()}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component{
    renderSquare(i){
      return (
          <Square value={this.props.squares[i]}
          onLik={() => this.props.onClick(i)}
        />
      )
    }
    render(){
      return(
        <div>
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
        </div>
      )
    }
}


class TextRow extends React.Component{
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  onKeyPressed(e) {
    console.log(e.key);
  }
  
  componentDidMount() {
    this.textInput.current.focus();
  }

  render(){
    return(
        <div 
          id={this.props.id} 
          contentEditable="true" 
          className="textRow"
          onKeyDown={this.props.onKey}
          ref={this.textInput}
          >
          {this.props.content} 
        </div >
    )
  }
}

class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rows: [{
        id:0, content:"Some Name Text"
      }],
    }
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(event){
    //console.log(event.key);
    if(event.key == "Enter"){
      event.preventDefault();
      const rows = this.state.rows;
      rows.push({id:rows.length, content:""});
      rows[event.target.id].content = event.target.textContent;
      this.setState({rows: rows});
    }
    else if(event.key == "ArrowUp"){
      event.preventDefault();
      try { 
        let row = document.getElementById(parseInt(event.target.id) - 1);
        row.focus();
        this.setState(
          this.state,
            ()=> {          
              row.selectionStart = row.selectionEnd = row.textContent.length;
            }
          )
          //https://stackoverflow.com/questions/38385936/change-the-cursor-position-in-a-textarea-with-react/38386230
        // console.log("one: " + event.target.selectionStart);
        // //row.setSelectionRange(2,event.target.textContent.length);
        // console.log("two: " + event.target.selectionEnd);
        // console.log("three: " + event.target.textContent.length);
        // //row.setSelectionRange(2,event.target.textContent.length);
      }
      catch(error){}
    }
    else if(event.key == "ArrowDown"){
      event.preventDefault();
      try { document.getElementById(parseInt(event.target.id) + 1).focus(); }
      catch(error){}
    }
    return;
  }

  render(){
    return(
      <div className="textEditor">
        {
          this.state.rows.map((row) =>
            <TextRow id={row.id} content={row.content} onKey={(e) => this.handleKey(e)} />
          )
        }
      </div>
    )
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }
  
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    })
  }

  render(){
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move)=> {
      
    })

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return(
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol></ol>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      <Game />
      <TextEditor />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;