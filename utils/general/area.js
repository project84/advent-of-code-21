export class Area {
	
	constructor(readings, isNumeric = true) {
		this.map = this.parseInput(readings, isNumeric);
		this.calculateSize();
	}

	parseInput(readings, isNumeric) {
		
		// Map is a flattened array of all readings with x and y position
		let map = [];
		readings.forEach((row, i) => {
			map.push(...row.split('').map((reading, j) => {
				return {
					value: isNumeric ? parseInt(reading) : reading,
					index: (i * row.length) + j,
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
		return (y * this.size.x) + x;
	}

	updatePosition(x, y, property, value) {
		this.map[this.getPositionIndex(x, y)][property] = value;
	}

	getRelativeIndex(currentX, currentY, xDelta = 0, yDelta = 0) {

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

	getNeighboursIndex(x, y, includeDiagonal) {

		// Retrieve and store non-diagonal neighbour indices and diagnols if required
		let neighbours = [
			...[
			this.getRelativeIndex(x, y, -1),
			this.getRelativeIndex(x, y, 1),
			this.getRelativeIndex(x, y, 0, -1),
			this.getRelativeIndex(x, y, 0, 1)
			],
			...(includeDiagonal ? [
				this.getRelativeIndex(x, y, -1, -1),
				this.getRelativeIndex(x, y, 1, -1),
				this.getRelativeIndex(x, y, -1, 1),
				this.getRelativeIndex(x, y, 1, 1)
			] : [])
		];
		
		// Filter out invalid indices
		return neighbours.filter(neighbour => Number.isInteger(neighbour));

	} 

	getNeighbours(x, y, includeDiagonal) {
		
		// For given co-ordinates, returns the readings at neighbouring positions
		let neighbours = this.getNeighboursIndex(x, y, includeDiagonal);
		return neighbours.map(index => this.map[index]);

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