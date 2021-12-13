export class Area {
	
	constructor(readings) {
		this.map = this.parseInput(readings);
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

	getAdjacentPositions(x, y, includeDiagonal) {
		
		// For given co-ordinates, returns the readings at adjacent positions
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

	static coordinatesToMap(coordinates, absentValue = 0, presentValue = 1) {
		
		const maxX = Math.max(...coordinates.map(coordinate => coordinate.x)) + 1;
		const maxY = Math.max(...coordinates.map(coordinate => coordinate.y)) + 1;

		let mappedCoordinates = [];

		for (let i = 0; i < maxY; i++) {

			let rowCoordinates = [];

			for (let j = 0; j < maxX; j++) {
				rowCoordinates.push(absentValue)
			}

			mappedCoordinates.push(rowCoordinates);

		}

		coordinates.forEach(coordinate => {

			mappedCoordinates[coordinate.y][coordinate.x] = presentValue;

		});

		return mappedCoordinates;

	}
	
}