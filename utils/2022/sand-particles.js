export class SandParticle {
  constructor(cave, width, height) {
    this.position = { x: 500, y: 0 };
    this.cave = cave;
    this.caveWidth = width;
    this.caveHeight = height;
  }

  fall() {
    while (this.getNextPosition() && this.position.y < this.caveHeight + 1) {
      this.position = this.getNextPosition();
    }

    this.cave[`${this.position.x}|${this.position.y}`] = { isSand: true };
  }

  getNextPosition() {
    const nextY = this.position.y + 1;

    if (!this.cave[`${this.position.x}|${nextY}`]) {
      return { x: this.position.x, y: nextY };
    }

    if (!this.cave[`${this.position.x - 1}|${nextY}`]) {
      return { x: this.position.x - 1, y: nextY };
    }

    if (!this.cave[`${this.position.x + 1}|${nextY}`]) {
      return { x: this.position.x + 1, y: nextY };
    }
  }
}
