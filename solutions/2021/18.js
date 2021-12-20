import { parseSnailfishNumber, addSnailfishNumbers, calculateMagnitude } from '../../utils/2021/snailfish-numbers';

export default function(inputFile) {

	// Convert raw input to list of flat snailfish numbers
	let sfNumbers = inputFile.map(row => parseSnailfishNumber(JSON.parse(row)));

	// Add all snailfish numbers in list
	let sfNumberSum = sfNumbers.reduce((a, b) => {
		return addSnailfishNumbers(a, b);
	});

	// Determine magnitudes for all possible pairs of snailfish numbers
	let pairMagnitudes = [];
	for (let i = 0; i < sfNumbers.length; i++) {
		for (let j = 0; j < sfNumbers.length; j++) {

			if (i != j) {
				
		        let sfNumber = addSnailfishNumbers(sfNumbers[i], sfNumbers[j]);
				pairMagnitudes.push(calculateMagnitude(sfNumber));
				
			}
		}
	}

	return {
		part1: calculateMagnitude(sfNumberSum),
		part2: Math.max(...pairMagnitudes)
	}
	
}