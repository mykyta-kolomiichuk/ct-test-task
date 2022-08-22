const gameEngineFactory = () => {
  const createArray = (length, mapFn) => {
    return Array.from({ length }, mapFn);
  }

  const createArray2D = (width, height, mapFn) => {
    return createArray(
      width,
      () => createArray(
        height,
        mapFn
      )
    );
  }

  const castIndexTo2D = (index, width) => {
    const column = index % width;
    const row = Math.floor(index / width);

    return [column, row];
  }

  const shuffleArray = (array) => {
    let index = array.length;
    let randomIndex;

    while (index !== 0) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
  }

  const getBHsPositions = (count, width, height) => {
    const arrayOfOrderedPositions = createArray(
      width * height,
      (n, i) => i
    );

    return shuffleArray(arrayOfOrderedPositions)
      .splice(0, count)
      .map((blackHoleIndex) => castIndexTo2D(blackHoleIndex, width));
  };

  const forEach2DSiblings = (wIndex, hIndex, width, height, callback) => {
    for (let w = wIndex - 1; w <= wIndex + 1; w++) {
      for (let h = hIndex - 1; h <= hIndex + 1; h++) {
        if (
          w < 0 || h < 0 ||
          w === width || h === height ||
          (w === wIndex && h === hIndex)) {
          continue;
        }

        callback(w, h);
      }
    }
  }

  const count2DSiblings = (wIndex, hIndex, width, height, board) => {
    forEach2DSiblings(wIndex, hIndex, width, height, (w, h) => {
      if (!board[w][h].isBlackHole) {
        board[w][h].value += 1;
      }
    });
  }

  const countBoard = (positions, width, height, board) => {
    positions.forEach(([wIndex, hIndex]) => {
      board[wIndex][hIndex].isBlackHole = true;
      count2DSiblings(wIndex, hIndex, width, height, board);
    });
  }

  const createBoard = (width, height) => {
    return createArray2D(
      width,
      height,
      () => ({
        isBlackHole: false,
        isClosed: true,
        value: 0,
      }));
  };

  const getRandomBlackHoles = (blackHoles, width, height) => {
    return getBHsPositions(blackHoles, width, height);
  };

  const openField = (wIndex, hIndex, board) => {
    const field = board[wIndex][hIndex];

    field.isClosed = false;

    return field;
  };

  const openSiblings = (initWIndex, initHIndex, width, height, board) => {
    const fieldsToOpen = [[initWIndex, initHIndex]];

    while (fieldsToOpen.length) {
      const [wIndex, hIndex] = fieldsToOpen.pop();

      forEach2DSiblings(wIndex, hIndex, width, height, (w, h) => {
        const field = board[w][h];

        if (!field.isClosed || field.isBlackHole) {
          return;
        }

        if (field.value > 0) {
          field.isClosed = false;
          return;
        }

        field.isClosed = false;
        fieldsToOpen.push([w, h]);
      });
    }
  };

  return {
    createBoard,
    getRandomBlackHoles,
    countBoard,
    openField,
    openSiblings,
  };
};

export const gameEngine = gameEngineFactory();
