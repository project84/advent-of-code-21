import { checkIllegalChunks } from '../../utils/2021/navigation';
import { sum as arraySum } from '../../utils/general/array-tools';

const charScores = require('../../fixtures/2021/chunk-character-scores');

export default function(inputFile) {

	/* Example */
	// Part 1: 26397
	// Part 2: 288957

	/* Actual */
	// Part 1: 399153
	// Part 2: 2995077699

	// Check navigation readings for illegal lines, and reduce all others to incomplete chunks
	let navigationOutput = inputFile
		.map(x => checkIllegalChunks({ value: x }));

	// Determine score for the illegal characters found
	let illegalCharScore = arraySum(navigationOutput
		.map(y => {
			// Illegal character score is mapped from static data
			return y.illegalCharacter ?
				charScores[y.illegalCharacter] :
				0;
		}));

	// Determine autocomplete scores for incomplete lines and sort in ascending order to allow retrieval of the middle score
	let autoCompleteScore = navigationOutput
		.filter(x => !x.illegalCharacter)
		.map(y => {

			const reading = y.value;
			let score = 0;

			// Autocomplete score multiplies by 5, then adds mapped score from static
			for (let i = reading.length - 1; i >= 0; i--) {
				score = (score * 5) + charScores[reading[i]];
			}

			return score;
		})
		.sort((a, b) => a - b);


	return {
		part1: illegalCharScore,
		part2: autoCompleteScore[Math.floor(autoCompleteScore.length / 2)]
	}

}