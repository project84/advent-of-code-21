export class Knot {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.visited = new Set();
    this.recordVisitedPosition();
  }

  move(direction) {
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
    return this.x >= head.x -1 &&
      this.x <= head.x + 1 &&
      this.y >= head.y - 1 &&
      this.y <= head.y + 1
  }

  followHead(head) {
    if (!this.isAdjacent(head)) {
      this.x += Math.sign(head.x - this.x);
      this.y += Math.sign(head.y - this.y);

      this.recordVisitedPosition();
    }
  }

  recordVisitedPosition() {
    this.visited.add(`${this.x}|${this.y}`);
  }

}