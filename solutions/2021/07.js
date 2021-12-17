import { sum as sumArray } from '../../utils/general/array-tools';
import calculateFuelConsumption from '../../utils/2021/crab-fuel-consumption';

export default function(inputFile) {

	/* Example */
	// Part 1: 37
	// Part 2: 168

	/* Actual */
	// Part 1: 335271
	// Part 2: 95851339

	// Sort crab positions to allow simple determination of median position
	const crabPositions = inputFile[0]
		.split(',')
		.map(crab => parseInt(crab))
		.sort((a, b) => a - b);

	// Determine median and average position of crabs
	const midPoint = Math.floor(crabPositions.length / 2);
	const averagePosition = sumArray(crabPositions) / crabPositions.length;

	return {
		part1: calculateFuelConsumption(crabPositions, [crabPositions[midPoint - 1], crabPositions[midPoint]]),
		part2: calculateFuelConsumption(crabPositions, [Math.floor(averagePosition), Math.ceil(averagePosition)], true)
	}
}