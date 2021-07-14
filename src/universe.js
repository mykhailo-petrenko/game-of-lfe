export class Universe {
  static createState(rows, cols) {
    const N = rows * cols;
    return Array(N).fill(false);
  }

  static nextStep(universe, rows, cols) {
    const nextGeneration = this.createState(rows, cols);

    for (let i = 0; i < universe.length; i++) {
      nextGeneration[i] = this.isLive(universe, cols, i);
    }

    return nextGeneration;
  }

  static isLive(universe, cols, i) {
    // count neighbors
    const neighbors = this.countNeighbors(universe, cols, i);

    if (universe[i] === true) {
      return (neighbors === 2 || neighbors === 3);
    } else {
      return (neighbors === 3);
    }
  }

  static countNeighbors(universe, cols, i) {
    const indexes = [
      i - 1,
      i + 1,
      i - cols,
      i + cols,
    ];

    if (i % cols !== 0) {
       indexes.push(i - cols - 1);
       indexes.push(i + cols - 1);
    }

    if ((i + 1) % cols !== 0) {
      indexes.push(i - cols + 1);
      indexes.push(i + cols + 1);
    }

    return indexes
      .filter(i => i >= 0)
      .reduce((prev, i) => {
        return prev + ((universe[i] === true) ? 1 : 0);
      }, 0);
  }


}
