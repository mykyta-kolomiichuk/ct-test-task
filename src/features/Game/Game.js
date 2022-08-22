import './Game.css';
import { memo, useCallback, useState } from 'react';

import StartingSettings from './partials/StartingSettings/StartingSettings';
import Playground from './partials/Board/Playground';

const GAME_STATE = {
  START: 'START',
  PROGRESS: 'PROGRESS',
}

const Game = memo(() => {
  const [gameState, setGameState] = useState(GAME_STATE.START);
  const [boardOptions, setBoardOptions] = useState({
    width: 8,
    height: 8,
    blackHoles: 10,
  });

  const onGameStart = (options) => {
    setBoardOptions(options);
    setGameState(GAME_STATE.PROGRESS);
  };

  const onGameEnd = useCallback(() => {
    setGameState(GAME_STATE.START);
  }, []);

  return (
    <div className="game">
      {
        gameState === GAME_STATE.START && (
          <StartingSettings
            initialOptions={boardOptions}
            onStart={onGameStart}
          />
        )
      }

      {
        gameState === GAME_STATE.PROGRESS && (
          <Playground
            options={boardOptions}
            onEnd={onGameEnd}
          />
        )
      }
    </div>
  );
});

export default Game;
