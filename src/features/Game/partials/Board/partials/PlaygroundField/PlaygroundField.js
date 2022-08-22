import './PlaygroundField.css';
import classnames from 'classnames';

const PlaygroundField = (props) => {
  const { field, wIndex, hIndex } = props

  return (
    <div
      className={
        classnames(
          'pg-field',
          field.isClosed && 'pg-closed',
          (field.value === 0 && !field.isBlackHole) && 'pg-zero',
          (field.isBlackHole) && 'pg-bh',
        )
      }
      data-w={wIndex}
      data-h={hIndex}
    >
      {
        !field.isClosed && (
          field.isBlackHole ? 'B' : field.value
        )
      }
    </div>
  );
};

export default PlaygroundField;
