import { writeFileSync } from 'fs';

export function recordResult(date, type, index, result, duration = Infinity, verified = false) {

    let results = getPreviousResults(date);

    console.log(results);

    return;


    /*
	// Find previously reported results for solution (if present)
	let results = require('../../fixtures/general/solution-results.json');
	let solutionInfo = results.filter(result => result.year === date.year && result.day === date.day)[0];
	let outcome;

	if (!solutionInfo) {

		// Add full solution info if not already present
		let newSolution = { year: date.year, day: date.day, example: [], actual: [] };
		newSolution[type][index] = { part1: result.step1, part2: result.step2, durationMs: duration, verified };
		results.push(newSolution);
		outcome = 'New result recorded.\n';

	} else {

		// Otherwise find if the result for the input file has been recorded
		let previousResult = solutionInfo[type][index];

		if (!previousResult) {

			// Record new input file results if not already present
			solutionInfo[type][index] = { part1: result.step1, part2: result.step2, durationMs: duration, verified };
			outcome = 'New result recorded.\n';

		} else {

			// Otherwise update duration if the latest attempt is faster
			previousResult.durationMs = duration < previousResult.durationMs ? duration : previousResult.durationMs;

			if (previousResult.verified) {

				if (verified) {
					return 'Verified result already recorded... please check and try again'
				}

				// If recorded result is verified, check current result against the verified result for accuracy
				outcome = result.step1 === previousResult.part1 && result.step2 === previousResult.part2 ?
					'Result verified!\n' :
					`Result differs from known result... expected:\nPart 1: ${previousResult.part1}\nPart 2: ${previousResult.part2}\n`;

			} else {

				// Otherwise update the result with the latest attempt
				solutionInfo[type][index].part1 = result.step1;
				solutionInfo[type][index].part2 = result.step2;
				solutionInfo[type][index].verified = verified;
				outcome = 'No verified result known, updated existing result.\n';

			}
		}
	}

	// Write results back to file and return outcome text
	writeFileSync('fixtures/general/solution-results.json', JSON.stringify(results, null, 4));
	return outcome;
    */

}

function getPreviousResults(date) {

    let results = require('../../fixtures/general/solution-results.json');

    if (!results[date.year]) {
        results[date.year] = {};
    }

    if (!results[date.year][date.day]) {
        results[date.year][date.day] = {}
    }

    return results;

}