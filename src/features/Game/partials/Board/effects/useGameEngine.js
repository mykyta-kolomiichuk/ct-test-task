import { useEffect, useMemo, useState } from 'react';
import { gameEngine } from './gameEngine.factory';

const useGameEngine = ({ width, height, blackHoles }) => {
  const [bhsPositions] = useState(() => gameEngine.getRandomBlackHoles(
    blackHoles, width, height
  ));
  const [board, setBoard] = useState(() => gameEngine.createBoard(
    width, height
  ));
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    gameEngine.countBoard(bhsPositions, width, height, board);
  }, []);

  const openAllBlackHoles = () => {
    bhsPositions.forEach(([wIndex, hIndex]) => gameEngine.openField(wIndex, hIndex, board));
  };

  const open = (wIndex, hIndex) => {
    const field = gameEngine.openField(wIndex, hIndex, board);

    if (field.isBlackHole) {
      openAllBlackHoles();
      setIsEnded(true);
      setBoard([...board]);
      return;
    }

    if (field.value === 0) {
      gameEngine.openSiblings(wIndex, hIndex, width, height, board);
    }

    setBoard([...board]);
  }

  return useMemo(() => ({
    board,
    open,
    isEnded
  }), [board, isEnded]);
};


export default useGameEngine;
