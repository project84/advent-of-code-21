export class Area {
	
	constructor(readings) {
		this.map = this.parseInput(readings);
		this.calculateSize();
	}

	parseInput(readings) {
		
		// Map is a flattened array of all readings with x and y position
		let map = [];
		readings.forEach((row, i) => {
			map.push(...row.split('').map((reading, j) => {
				return {
					value: parseInt(reading),
					x: j,
					y: i
				}
			}));
		});

		return map;
	}

	calculateSize() {
		this.size = {
			x: this.map[this.map.length - 1].x + 1,
			y: this.map[this.map.length - 1].y + 1
		};
	}

	getPositionIndex(x, y) {
		return this.map.findIndex(position => position.x === x && position.y === y);
	}

	updatePosition(x, y, property, value) {
		this.map[this.getPositionIndex(x, y)][property] = value;
	} 

	getNeighbours(x, y, includeDiagonal) {
		
		// For given co-ordinates, returns the readings at neighbouring positions
		return this.map.filter(position => {
			return (position.x === x - 1 && position.y === y) ||
				(position.x === x + 1 && position.y === y) ||
				(position.x === x && position.y === y - 1) ||
				(position.x === x && position.y === y + 1) ||
				(includeDiagonal && position.x === x - 1 && position.y === y - 1) ||
				(includeDiagonal && position.x === x + 1 && position.y === y - 1) ||
				(includeDiagonal && position.x === x - 1 && position.y === y + 1) ||
				(includeDiagonal && position.x === x + 1 && position.y === y + 1)
		});

	}

	getRelativeIndex(currentX, currentY, xDelta, yDelta) {

		// No valid neighbours if attempting to move outside grid
		if (
			(currentX + xDelta) < 0 ||
			(currentX + xDelta) > (this.size.x - 1) ||
			(currentY + yDelta) < 0 ||
			(currentY + yDelta) > (this.size.y - 1)
		) {
			return false;
		}

		// Determine current index based on x and y positions
		let currentIndex = (currentY * this.size.x) + currentX;
		if (currentIndex > this.map.length - 1) {
			return false;
		}

		// Find target index based on current index and delta, return if within grid
		let targetIndex = currentIndex + (this.size.x * yDelta) + xDelta;

		return targetIndex >= 0 && targetIndex <= this.map.length - 1 ?
			targetIndex : false;
		
	}

	getNeighboursIndex(x, y) {

		let neighbours = [];

		let currentIndex = (y * this.size.x) + x;

		if (x > 0) neighbours.push(currentIndex - 1);
		if (x < this.size.x - 1) neighbours.push(currentIndex + 1);
		if (y > 0) neighbours.push(currentIndex - this.size.x);
		if (y < this.size.y - 1) neighbours.push(currentIndex + this.size.x);

		return neighbours;

	}

	getMapString() {

		let mapString = '';

		// Generate map as a string, adding new lines as appropriate, then log
		this.map.forEach(position => {
			mapString += position.x === 0 ? 
				'\n' + position.value :
				position.value;
		});

		return mapString;
		
	}

	printMap() {

		console.log(this.getMapString());
		
	}
	
}