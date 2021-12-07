import { sum as arraySum } from '../general/array-tools';

export default function(crabPositions, targetPos, triangular) {

	// Get min / max target values
	let targetValues = [ Math.floor(targetPos), Math.ceil(targetPos) ];
	let fuelConsumption = [];

	targetValues.forEach(value => {
		fuelConsumption.push(arraySum(crabPositions.map(crab => {
			
			// Determine fuel consumption for each target value
			const distanceToMove = Math.abs(crab - value);
			return triangular ? 
				distanceToMove * (distanceToMove + 1) / 2 :
				distanceToMove;

		})));
	});

	// Return lowest fuel consumption
	return Math.min(...fuelConsumption);

}