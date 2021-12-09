export class Cave {
	
	constructor(readings) {
		this.heightMap = this.parseHeightReadings(readings);
	}

	parseHeightReadings(readings) {
		
		// Height map is a flattened array of all readings with x and y position
		let heightMap = [];
		readings.forEach((row, i) => {
			heightMap.push(...row.split('').map((reading, j) => {
				return {
					value: parseInt(reading),
					x: j,
					y: i
				}
			}));
		});

		return heightMap;
	}

	getAdjacentReadings(x, y) {
		
		// For given co-ordinates, returns the readings at adjacent positions
		return this.heightMap.filter(position => {
			return (position.x === x - 1 && position.y === y) ||
				(position.x === x + 1 && position.y === y) ||
				(position.x === x && position.y === y - 1) ||
				(position.x === x && position.y === y + 1)
		});

	}

	mapBasin(readings) {

		// Find readings in the input that are yet to be assessed, return if there are none
		let unassessedReadings = readings.filter(reading => !reading.assessed);
		if (!unassessedReadings.length) {
			return readings;
		}

		unassessedReadings.forEach(unassessedReading => {

			// For a given current position add any *new* adjacent readings that have
			// a value less than 9
			readings.push(...this
				.getAdjacentReadings(unassessedReading.x, unassessedReading.y)
				.filter(reading => {
					return reading.value < 9 &&
						!readings.filter(a => a.x === reading.x && a.y === reading.y).length 
				}));

			// Record that the reading has now been assessed
			readings[readings.findIndex(a => a.x === unassessedReading.x && a.y === unassessedReading.y)].assessed = true;
		});

		// Continue to map basin recursively with any new readings retrieved 
		return this.mapBasin(readings);

	}

}