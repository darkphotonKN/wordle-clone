import { useState, useEffect } from 'react';
const GRID_HEIGHT = 6;
const GRID_WIDTH = 5;

const Board = () => {
  const wordOfTheDay = 'loner';
  const [win, setWin] = useState(false);
  const [grid, setGrid] = useState(null); // grid state
  const [guessAttempt, setGuessAttempt] = useState(''); // current player guess
  const [stage, setStage] = useState(0); // stage the player is on

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
    if (grid) {
      // bind global keypress event listener
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid]);

  useEffect(() => {
    // repopulate grid on current word guess attempt
    if (grid) {
      const newGrid = [...grid];
      const win = checkWinCondition(guessAttempt);
      if (win) return;
      const row = guessAttempt.split('');
      if (row.length === 5) {
        // check if full submission of the word is a correct word
        setGuessAttempt(''); // reset guess attempt
        // upgrade to next level
        setStage((prevStage) => prevStage + 1);
      }
      if (row.length < 5) {
        const fillNo = 5 - row.length;
        for (let i = 0; i < fillNo; i++) {
          row.push('');
        }
      }
      newGrid[stage] = row;
      setGrid(newGrid);
    }
  }, [guessAttempt]);

  // binds keyboard events to track user's word-guess attempt
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

  const checkWinCondition = (word) => {
    // matching win condition returns true
    if (word.toLowerCase() === wordOfTheDay) {
      setWin(true);
      return true;
    }
    return false;
  };

  console.log('win:', win);
  console.log('grid:', grid);
  console.log('stage:', stage);
  console.log('guessAttempt:', guessAttempt);

  return (
    <div className="board">
      {win && (
        <div className="overlay">
          <div className="win-condition-modal">
            Congrats you guessed the Word of the Day!
          </div>
        </div>
      )}
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
