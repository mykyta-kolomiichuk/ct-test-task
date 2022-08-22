import { Typography } from '@mui/material';
import Game from './features/Game/Game';

import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <Typography>
          PROXX GAME
        </Typography>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
