export class Knot {

  constructor() {

    // Set and record starting position of the knot
    this.x = 0;
    this.y = 0;

    this.visited = new Set();
    this.recordVisitedPosition();

  }

  move(direction) {

    // Decode direction to determine movement of knot in x / y space
    switch (direction) {
      case 'U':
        this.y++;
        break;
  
      case 'D':
        this.y--;
        break;
  
      case 'L':
        this.x--;
        break;
      
      case 'R':
        this.x++;
    }
  }

  isAdjacent(head) {

    // Tail knot is adjacent to it's head if it is within 1 position of the head in all directions
    return this.x >= head.x -1 &&
      this.x <= head.x + 1 &&
      this.y >= head.y - 1 &&
      this.y <= head.y + 1

  }

  followHead(head) {

    if (!this.isAdjacent(head)) {

      // If the tail is not adjacent to the head it needs to move one position towards the head
      // in any direction where the x or y value is not the same
      // This accounts for both straight and diagonal movements
      // If the x or y value is the same, there is no movement in that direction
      this.x += Math.sign(head.x - this.x);
      this.y += Math.sign(head.y - this.y);

      // After moving, record the current position if not previously visited
      this.recordVisitedPosition();
    }

  }

  recordVisitedPosition() {
    // Add current x and y position to the list of visited positions
    // Use of set ensures only unique positions are added
    this.visited.add(`${this.x}|${this.y}`);
  }

}