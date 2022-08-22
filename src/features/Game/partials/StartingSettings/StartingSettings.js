import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import './StartingSettings.css';

const HEIGHT_VALIDATORS = [
  (int) => int < 3,
  (int) => int > 100,
];

const WIDTH_VALIDATORS = [
  (int) => int < 3,
  (int) => int > 150,
];

const BLACK_HOLES_VALIDATORS = [
  (int) => int <= 0,
  (int, width, height) => int > width * height,
];

const VALIDATORS = {
  'width': WIDTH_VALIDATORS,
  'height': HEIGHT_VALIDATORS,
  'blackHoles': BLACK_HOLES_VALIDATORS,
}

const ERRORS = {
  'width': 'Should be >3 and <200',
  'height': 'Should be >3 and <200',
  'blackHoles': 'Should be >0 and less than board size',
}

const StartingSettings = (props) => {
  const {
    initialOptions,
    onStart,
  } = props;

  const [error, setError] = useState({});
  const [options, setOptions] = useState(initialOptions);

  const onChange = (value, field) => {
    const int = parseInt(value);

    const hasErrors = VALIDATORS[field].some((validatorFn) => validatorFn(int, options.width, options.height));

    if (hasErrors) {
      setError((prevErrorState) => ({
        ...prevErrorState,
        [field]: ERRORS[field],
      }));
    } else {
      setError((prevErrorState) => ({
        ...prevErrorState,
        [field]: null,
      }));
    }

    setOptions((prevOptionState) => ({
      ...prevOptionState,
      [field]: int,
    }));
  };

  return (
    <div className="settings">
      <div className="row">
        <TextField
          id="width"
          variant="standard"
          label="Width"
          inputProps={{
            type: 'number'
          }}
          value={options.width}
          onChange={(event) => onChange(event.target.value, 'width')}
          error={!!error.width}
          helperText={error.width}
        />
        <TextField
          id="height"
          variant="standard"
          label="Height"
          inputProps={{
            type: 'number'
          }}
          value={options.height}
          onChange={(event) => onChange(event.target.value, 'height')}
          error={!!error.height}
          helperText={error.height}
        />
      </div>
      <div className="row">
        <TextField
          id="blackHoles"
          fullWidth
          variant="standard"
          label="Black Holes"
          inputProps={{
            type: 'number'
          }}
          disabled={error.height || error.width}
          value={options.blackHoles}
          onChange={(event) => onChange(event.target.value, 'blackHoles')}
          error={!!error.blackHoles}
          helperText={error.blackHoles}
        />
      </div>

      <div className="row actions">
        <Button variant="contained" onClick={() => onStart(options)}>
          START
        </Button>
      </div>
    </div>
  );
};

export default StartingSettings;
