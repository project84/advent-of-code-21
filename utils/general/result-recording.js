import { readFileSync, writeFileSync } from 'fs';

export function recordResult(date, type, index, result, duration, verified = false) {

    let results = getPreviousResults(date);
	let prevResultsForDay = results[date.year][date.day][type];
	let outcome = '';

    if (!prevResultsForDay[index]) {
		prevResultsForDay[index] = {
			part1: { answer: result.part1, verified },
			part2: { answer: result.part2, verified },
			durationMs: duration
		}
		outcome = 'New result recorded.\n';
	} else {

		let previousResult = prevResultsForDay[index];

		let previousDuration = previousResult.durationMs;
		previousResult.durationMs = duration < previousDuration ? duration : previousDuration;

		[ 'part1', 'part2' ].forEach(part => {

			let partText = part[part.length - 1] === '1' ? 'Part 1' : 'Part 2';
			
			if (previousResult[part].verified) {

				if (verified) {
					outcome += `Verified answer for ${partText} already recorded... please check and try again`
				} else {
					outcome += result[part] != previousResult[part] ? 
						`${partText} answer verified!\n` :
						`${partText} answer differs from known result... expected: ${previousResult[part].answer}\n`;
				}

			} else {

				// Otherwise update the result with the latest attempt
				previousResult[part].answer = result.part1;
				previousResult[part].answer = result.part2;
				previousResult[part].verified = verified;
				outcome += verified ? `${partText} verified answer recorded!` : `No verified answer for ${partText.toLowerCase()} known, updated existing answer.\n`;

			}

		});

	}

	writeFileSync('fixtures/general/solution-results.json', JSON.stringify(results, null, 4));
    return outcome;

}

function getPreviousResults(date) {

    let results = JSON.parse(readFileSync('fixtures/general/solution-results.json', 'utf-8'));

    if (!results[date.year]) {
        results[date.year] = {};
    }

    if (!results[date.year][date.day]) {
        results[date.year][date.day] = { example: {}, actual: {} }
    }

    return results;

}