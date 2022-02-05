import { useState, useEffect } from 'react';
const GRID_HEIGHT = 6;
const GRID_WIDTH = 5;

const Board = () => {
  const [grid, setGrid] = useState(null);
  const [guessAttempt, setGuessAttempt] = useState('');

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

  useEffect(() => {
    let windowEventId;
    if (grid) {
      // bind global keypressa event listener
      windowEventId = window.addEventListener('keydown', handleKeyPress);
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid]);

  const handleKeyPress = (event) => {
    if (event.key === 'Backspace') {
      const trimmedAttempt = guessAttempt.slice(0, guessAttempt.length - 1);
      setGuessAttempt(trimmedAttempt);
    } else {
      const newAttempt = guessAttempt + event.key;
      if (newAttempt.length <= 5) {
        setGuessAttempt(newAttempt);
      }
    }
  };

  useEffect(() => {
    // repopulate grid on current word guess attempt
    if (grid) {
      const newGrid = [...grid];
      console.log('guessAttempt:', guessAttempt);
      const newWord = guessAttempt.slice(0, 5);
      console.log('newWord:', newWord);
      const row = newWord.split('');
      if (row.length < 5) {
        const fillNo = 5 - row.length;
        for (let i = 0; i < fillNo; i++) {
          row.push('');
        }
      }
      console.log('row:', row);
      newGrid[0] = row;
      setGrid(newGrid);
    }
  }, [guessAttempt]);

  console.log('grid:', grid);

  return (
    <div className="board">
      {grid?.map((blockRow) => (
        <div className="block-row">
          {blockRow.map((block, index) => (
            <div className="block-wrap">
              <div className={block ? 'block filled' : 'block'}>{block}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
