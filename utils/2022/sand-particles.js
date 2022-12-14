export class SandParticle {
  constructor(cave, width, height) {
    // Set start position and ingest current cave
    this.position = { x: 500, y: 0 };

    this.cave = cave;
    this.caveWidth = width;
    this.caveHeight = height;
  }

  fall() {
    // Sand particles fall until they cannot fall any further, the position is updated when the particle has settled
    while (this.getNextPosition()) {
      this.position = this.getNextPosition();
    }

    this.cave[`${this.position.x}|${this.position.y}`] = { isSand: true };
  }

  getNextPosition() {
    // Determines the next possible position for the sand particle when falling

    // First calculate which y position the particle falls to, if the particle
    // has reached the floor, it cannot move further
    const nextY = this.position.y + 1;
    if (nextY === this.caveHeight + 2) {
      return;
    }

    return [0, -1, 1].reduce((newPosition, move) => {
      // If the particle hasn't reached the floor check whether the position immediately below
      // is occupied, then again for the positions one to the left and right. If all positions
      // are occupied, the particle can't fall further

      // Stop processing if we'd already found the next position
      if (newPosition) {
        return newPosition;
      }

      const nextX = this.position.x + move;
      if (!this.cave[`${nextX}|${nextY}`]) {
        return { x: nextX, y: nextY };
      }
    }, null);
  }
}
