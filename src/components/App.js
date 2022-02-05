import './App.css';

import Board from './Board';

const App = () => {
  return (
    <div className="App">
      <div className="app-wrap">
        <h3 className="title">WORDLE</h3>
        <Board />
      </div>
    </div>
  );
};

export default App;
