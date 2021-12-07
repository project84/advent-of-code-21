import calculateFuelConsumption from '../../utils/2021/crab-fuel-consumption';

export default function(inputFile) {

	/* Example */
	// Step 1: 37
	// Step 2: 168

	/* Actual */
	// Step 1: 335271
	// Step 2: 95851339

	// Sort crab positions to allow simple determination of median position
	const crabPositions = inputFile[0]
		.split(',')
		.map(crab => parseInt(crab))
		.sort((a, b) => a - b);

	// Determine median and average position of crabs
	const medianPosition = crabPositions[Math.floor(crabPositions.length / 2) - 1];
	const averagePosition = arraySum(crabPositions) / crabPositions.length;

	return {
		step1: calculateFuelConsumption(crabPositions, medianPosition),
		step2: calculateFuelConsumption(crabPositions, averagePosition, true)
	}
}