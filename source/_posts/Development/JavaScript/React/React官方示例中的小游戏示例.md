---
title: React官方示例中的小游戏示例
tags:
  - 开发
categories:
  - Development
  - React
toc: true
cover: /assets/images/20191121175758.webp
abbrlink: c07cc943
date: 2019-11-21T17:56:03.000Z
thumbnail: /assets/thumbnail/20191121175758.webp
---

# 示例地址

[https://zh-hans.reactjs.org/tutorial/tutorial.html#lifting-state-up](https://zh-hans.reactjs.org/tutorial/tutorial.html#lifting-state-up)

<!-- more -->

# 代码（具体的逻辑注解在代码中）

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        // 如果像下面这样写的话,箭头函数其实返回的是一个函数,
        // 这个函数就是this.props.onClick()中传入的函数
        // 等价于: () => {return this.props.onClick()}
        // 也等价于: {this.props.onClick} 注意两边都没有括号.是上面式子的一种简写,用户没有参数的函数
        onClick={this.props.onClick}
        // onClick={() => {
        //   console.log(this.props.onClick())
        //   return this.props.onClick()
        // }}
      >
        {this.props.value}
      </button>
    );
  }
}

// function Square(props){
//   return (
//     <button
//       className="square"
//       // 此处也是用了简写方式
//       onClick={props.onClick}
//     >
//       {props.value}
//     </button>
//   );
// }

class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        // 通过实验可以知道此处的onClick其实需要传入一个函数的执行而不是函数本身
        // handle: undefined
        onClick={() => { 
          console.log('handle:', this.handleClick(i))
          return this.handleClick(i)
        }}
      />
    );
  }

  handleClick = function (i) {
    const squares = this.state.squares.slice();
    // squares[i] = 'X';
    if(calculateWinner(this.state.squares)) return;
    if(squares[i] === null){
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if(winner){
      status = "Winner:" + winner
    }else{
      status = 'Next player: ' + (this.state.xIsNext?'X':'O');
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
      </div>
    );
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
```

# 如果你想自己尝试的话：

[https://codepen.io/gaearon/pen/oWWQNa?editors=0010](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)
