import * as array from '../general/array-tools';
import triangularNumber from '../general/triangular-number';

export default function(crabPositions, targetValues, triangular) {

	targetValues = array.deduplicate(targetValues);
	let fuelConsumption = [];

	targetValues.forEach(value => {
		fuelConsumption.push(array.sum(crabPositions.map(crab => {
			
			// Determine fuel consumption for each target value supplied
			const distanceToMove = Math.abs(crab - value);
			return triangular ? 
				triangularNumber(distanceToMove) :
				distanceToMove;

		})));
	});

	// Return lowest fuel consumption
	return Math.min(...fuelConsumption);

}