import { Reindeer } from '../../utils/2015/reindeer'

export default function (inputFile) {

	// Create array of reindeer class instances
	let reindeers = inputFile.map(reindeer => new Reindeer(reindeer));

	for (let i = 1; i <= 2503; i++) {

		// Calculate reindeer positions at given time and determine furthest reindeer
		let currentPositions = reindeers.map(reindeer => reindeer.calculatePosition(i));
		let furthestPosition = Math.max(...currentPositions);

		// Add point to all reindeers at the furthest position
		currentPositions.forEach((position, i) => {
			if (position === furthestPosition) {
				reindeers[i].addPoint();
			}
		});

	}

	return {
		1: Math.max(...reindeers.map(reindeer => reindeer.calculatePosition(2503))),
		2: Math.max(...reindeers.map(reindeer => reindeer.getScore()))
	}
}