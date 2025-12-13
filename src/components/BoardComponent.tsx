import { FC, useEffect, useState } from "react";
import "../App.css";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import React from "react";
import { Cell } from "../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}



const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null); 

  function click (cell: Cell) {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
    } else {
      setSelectedCell(cell)
    }
    // ** клик только на ячейку с фигурой на ней
    // if(cell.figure) {
    //   setSelectedCell(cell);
    // }
}

useEffect(() => {
  highLightCells()
  
}, [selectedCell])

function highLightCells() {
  board.highLightCells(selectedCell)
  updateBoard()
}

function updateBoard() {
  const newBoard = board.getCopyBoard();
  setBoard(newBoard)
}

  return (
    <div className="board">
      {board.cells.map((row: Cell[], index: number) => 
        <React.Fragment key={index}>
          {row.map(cell =>
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default BoardComponent;
