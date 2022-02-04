import { useState, useEffect } from 'react';
import './App.css';

const GRID_HEIGHT = 6;
const GRID_WIDTH = 5;

const App = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // populate initial grid
    const newGrid = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
      newGrid.push([]);
      for (let col = 0; col < GRID_WIDTH; col++) {
        newGrid[row].push('');
      }
    }

    // initate the empty grid
    setGrid(newGrid);
  }, []);

  console.log('grid:', grid);

  return (
    <div className="App">
      <div className="app-wrap">
        <h3 className="title">WORDLE</h3>
        <div className="board">
          {grid.map((blockRow, rowIndex) => (
            <div className="block-row" key={rowIndex}>
              {blockRow?.map((block, colIndex) => (
                <div
                  className="block-wrap"
                  key={(rowIndex + 1) * (colIndex + 1) * 1000}
                >
                  <div className="block">{colIndex + 1}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
