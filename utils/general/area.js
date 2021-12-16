export class Area {
	
	constructor(readings) {
		this.map = this.parseInput(readings);
		this.size = {
			x: this.map[this.map.length - 1].x + 1,
			y: this.map[this.map.length - 1].y + 1
		};
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

	getNeighboursIndex(x, y, maxX, maxY) {

		let neighbours = [];

		let currentIndex = (y * maxX) + x;

		if (x > 0) neighbours.push(currentIndex - 1);
		if (x < maxX - 1) neighbours.push(currentIndex + 1);
		if (y > 0) neighbours.push(currentIndex - maxX);
		if (y < maxY - 1) neighbours.push(currentIndex + maxX);

		return neighbours;

	}

	printMap() {
		let mapString = '';

		// Generate map as a string, adding new lines as appropriate, then log
		this.map.forEach(position => {
			mapString += position.x === 0 ? 
				'\n' + position.value :
				position.value;
		});

		console.log(mapString);
		
	}
	
}