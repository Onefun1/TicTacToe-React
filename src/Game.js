import React from "react";

const winPositions = ["012", "036", "048", "147", "246", "258", "345", "678"];

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      cells: Array(9).fill(null),
      winner: null,
      currentTurn: 1
    };
  }

  fillCells(value) {
    return value || "";
  }

  markCell(index) {
    const { winner, currentTurn } = this.state;
    const cells = [...this.state.cells];
    let winnerIs;

    if (cells[index] !== null || winner) {
      return;
    }

    const mark = currentTurn % 2 === 1 ? "X" : "O";
    cells[index] = mark;
    winnerIs = this.checkWinner(cells);

    if (currentTurn === 9 && winnerIs === null) {
      winnerIs = "Draw";
    }

    this.setState(prevState => {
      return {
        cells,
        winner: winnerIs,
        currentTurn: prevState.currentTurn + 1
      };
    });
  }

  checkWinner(cells) {
    for (const position of winPositions) {
      const [a, b, c] = [...position];

      if (cells[a] !== null && cells[a] === cells[b] && cells[b] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }

  restartGame() {
    console.log("Click");
    this.setState({
      cells: Array(9).fill(null),
      winner: null,
      currentTurn: 1
    });
  }

  render() {
    const { cells, winner, currentTurn } = this.state;

    return (
      <div>
        <div>
          <h1 className="Title">Tic Tac Toe</h1>
          <h3>
            {winner === "Draw"
              ? "DRAW"
              : winner
              ? `Winner is ${winner}`
              : `Move ${currentTurn}`}
          </h3>
        </div>
        <div className="playingField">
          {cells.map((cell, index) => (
            <div
              key={index}
              className="playingField__cell"
              onClick={() => this.markCell(index)}
            >
              {this.fillCells(cell)}
            </div>
          ))}
          <div className="restart__button" onClick={() => this.restartGame()}>
            Restart
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
