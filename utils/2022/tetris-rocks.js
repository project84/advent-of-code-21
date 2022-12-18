export class TetrisCave {
  constructor(width, jetPattern) {
    this.width = width;
    this.height = 0;

    this.gasJets = jetPattern[0].split('').map((jet) => (jet === '>' ? 1 : -1));

    this.settledRockPositions = {};
    this.rockShapeIndex = 0;

    this.rock = new TetrisRock(this.width);
  }

  dropRock() {
    this.rock.reset(this.rockShapeIndex % 5, this.height + 3);
    this.rockShapeIndex++;

    let movementIndex = 0;
    while (!this.rock.isSettled) {
      if (movementIndex % 2) {
        this.rock.move('y', -1, this.width, this.settledRockPositions);
      } else {
        const distance = this.gasJets.shift();
        this.rock.move('x', distance, this.width, this.settledRockPositions);
        this.gasJets.push(distance);
      }
      movementIndex++;
    }
    this.addSettledRocks(this.rock.position);
  }

  addSettledRocks(positions) {
    positions.forEach((position) => {
      if (!this.settledRockPositions[position.y]) {
        this.settledRockPositions[position.y] = new Set();
      }
      this.settledRockPositions[position.y].add(position.x);
      this.height = Math.max(this.height, position.y + 1);
    });
  }
}

class TetrisRock {
  constructor() {}

  reset(shape, height) {
    this.position = this.getShape(shape, height);
    this.isSettled = false;
  }

  getShape(shape, height) {
    switch (shape) {
      case 0:
        return Array.from({ length: 4 }, (_, i) => ({
          x: 2 + i,
          y: height,
        }));

      case 1:
        return [
          {
            x: 2,
            y: height + 1,
          },
          ...Array.from({ length: 3 }, (_, i) => ({ x: 3, y: height + i })),
          {
            x: 4,
            y: height + 1,
          },
        ];

      case 2:
        return [
          ...Array.from({ length: 3 }, (_, i) => ({ x: 2 + i, y: height })),
          ...Array.from({ length: 2 }, (_, i) => ({ x: 4, y: height + i + 1 })),
        ];

      case 3:
        return Array.from({ length: 4 }, (_, i) => ({ x: 2, y: height + i }));

      case 4:
        return [
          ...Array.from({ length: 2 }, (_, i) => ({ x: 2 + i, y: height })),
          ...Array.from({ length: 2 }, (_, i) => ({ x: 2 + i, y: height + 1 })),
        ];
    }
  }

  move(axis, distance, width, settledRockPositions) {
    const newPosition = this.position.map((part) => ({
      ...part,
      [axis]: part[axis] + distance,
    }));
    if (
      newPosition.every(
        (part) =>
          part.x >= 0 &&
          part.x < width &&
          part.y >= 0 &&
          !(
            settledRockPositions[part.y] &&
            settledRockPositions[part.y].has(part.x)
          )
      )
    ) {
      this.position = newPosition;
    } else if (axis === 'y') {
      this.isSettled = true;
    }
  }
}
