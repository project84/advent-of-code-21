import { Area } from './area';

export class LavaTube extends Area {
	constructor(readings) {
		super(readings);
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
				.getAdjacentPositions(unassessedReading.x, unassessedReading.y)
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