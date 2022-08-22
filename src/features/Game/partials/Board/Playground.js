import './Playground.css';
import useGameEngine from './effects/useGameEngine';
import { Button } from '@mui/material';
import PlaygroundField from './partials/PlaygroundField/PlaygroundField';

const Playground = (props) => {
  const {
    options,
    onEnd
  } = props;

  const { board, open, isEnded } = useGameEngine(options);

  const onBoardClick = (event) => {
    if (isEnded) {
      return;
    }

    const { w, h } = event.target.dataset;

    if (w && h) {
      open(parseInt(w), parseInt(h));
    }
  };

  return (
    <div>
      <div className="pg-content"
        onClick={onBoardClick}
      >
        {board.map((column, wIndex) => (
          <div key={wIndex} className="pg-column">
            {column.map((field, hIndex) => (
              <div key={hIndex}
                   className="pg-row">
                <PlaygroundField
                  field={field}
                  wIndex={wIndex}
                  hIndex={hIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pg-actions">
        <Button variant="text" onClick={onEnd}>Back</Button>
      </div>
    </div>
  );
};

export default Playground;
