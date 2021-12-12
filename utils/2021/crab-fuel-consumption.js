import * as array from '../general/array-tools';

export default function(crabPositions, targetValues, triangular) {

	targetValues = array.deduplicate(targetValues);
	let fuelConsumption = [];

	targetValues.forEach(value => {
		fuelConsumption.push(array.sum(crabPositions.map(crab => {
			
			// Determine fuel consumption for each target value supplied
			const distanceToMove = Math.abs(crab - value);
			return triangular ? 
				distanceToMove * (distanceToMove + 1) / 2 :
				distanceToMove;

		})));
	});

	// Return lowest fuel consumption
	return Math.min(...fuelConsumption);

}