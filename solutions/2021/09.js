import { LavaTube } from '../../utils/2021/lava-tubes';
import { sum as arraySum } from '../../utils/general/array-tools';

export default function(inputFile) {

	/* Example */
	// Step 1: 15
	// Step 2: 1134

	/* Actual */
	// Step 1: 541
	// Step 2: 847504
	
	// Map input readings to the cave floor
	const cave = new LavaTube(inputFile);

	let lowPoints = [];

	cave.map.forEach(reading => {

		// Retrieve readings adjacent to current position and determines if it counts
		// as a low point
		const adjacentReadings = cave.getAdjacentPositions(reading.x, reading.y);
		if (adjacentReadings.every(adjReading => adjReading.value > reading.value)) {
			lowPoints.push(reading);
		}

	});

	// Map all basins from the known low points, determine length and sort
	// to simplify identification of 3 largest basins
	const basins = lowPoints
		.map(lowPoint => cave.mapBasin([lowPoint]).length)
		.sort((a, b) => a - b);

	return {
		step1: arraySum(lowPoints.map(reading => reading.value + 1)),
		step2: basins[basins.length - 1] *
			basins[basins.length - 2] *
			basins[basins.length - 3]
	}

}