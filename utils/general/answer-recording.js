import { readFileSync, writeFileSync } from 'fs';

export function recordAnswer(date, type, index, answer, duration, verified = false) {

	// Retrieve and check previous answers for the date supplied and input file type
    let answers = getPreviousAnswers(date, type, index);
	let outcome = '';

	// Find existing answer and current best time
	let previousAnswer = answers[date.year][date.day][type][index];
	let previousDuration = previousAnswer.durationMs || Infinity;

	// Check for new best time and update accordingly
	if (duration < previousDuration) {
		previousAnswer.durationMs = duration;
		outcome += 'New best time!\n';
	}

	// For each part of the executed iteration
	[ 'part1', 'part2' ].forEach(part => {

		let partText = part[part.length - 1] === '1' ? 'Part 1' : 'Part 2';
		
		if (previousAnswer[part].verified) {

			// If the answer has already been verified, and an unverified answer is supplied, 
			// check if the answer is the same and report back if not
			if (verified) {
				outcome += `Verified answer for ${partText} already recorded... please check and try again\n`
			} else {
				outcome += answer[part] === previousAnswer[part].answer ? 
					`${partText} answer verified!\n` :
					`${partText} answer differs from known result... expected: ${previousAnswer[part].answer}\n`;
			}

		} else {

			if (!(answer[part] == null)) {

				// Otherwise update the answer with the latest attempt
				previousAnswer[part].answer = answer[part];
				previousAnswer[part].verified = verified;
				outcome += verified ? `${partText} verified answer recorded!\n` : `No verified answer for ${partText.toLowerCase()} known, updated existing answer.\n`;

			}

		}

	});

	writeFileSync('fixtures/general/solution-answers.json', JSON.stringify(answers, null, 4));
    return outcome;

}

function getPreviousAnswers(date, type, index) {

	// Read previous answers from file
    let answers = JSON.parse(readFileSync('fixtures/general/solution-answers.json', 'utf-8'));

	// Check if previous answers recorded, otherwise create empty structure for them
    if (!answers[date.year]) {
        answers[date.year] = {};
    }

    if (!answers[date.year][date.day]) {
        answers[date.year][date.day] = { example: {}, actual: {} }
    }

	if (!answers[date.year][date.day][type][index]) {
		answers[date.year][date.day][type][index] = {
			part1: { answer: null, verified: false },
			part2: { answer: null, verified: false },
		}
	}

    return answers;

}