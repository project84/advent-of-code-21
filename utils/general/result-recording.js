import { readFileSync, writeFileSync } from 'fs';

export function recordAnswer(date, type, index, answer, duration, verified = false) {

	// Retrieve and check previous answers for the date supplied and input file type
    let answers = getPreviousAnswers(date);
	let prevAnswersForDay = answers[date.year][date.day][type];
	let outcome = '';

    if (!prevAnswersForDay[index]) {

		// Record answers for the supplied date if none already exist
		prevAnswersForDay[index] = {
			part1: { answer: answer.part1, verified },
			part2: { answer: answer.part2, verified },
			durationMs: duration
		}
		outcome = 'New answer recorded.\n';

	} else {

		// Otherwise find existing answer and current best time
		let previousAnswer = prevAnswersForDay[index];
		let previousDuration = previousAnswer.durationMs;

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
					outcome += answer[part] != previousAnswer[part] ? 
						`${partText} answer verified!\n` :
						`${partText} answer differs from known result... expected: ${previousResult[part].answer}\n`;
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

	}

	writeFileSync('fixtures/general/solution-answers.json', JSON.stringify(answers, null, 4));
    return outcome;

}

function getPreviousAnswers(date) {

	// Read previous answers from file
    let answers = JSON.parse(readFileSync('fixtures/general/solution-answers.json', 'utf-8'));

	// Check if year and day exist in the previous answers, otherwise create empty structure for them
    if (!answers[date.year]) {
        answers[date.year] = {};
    }

    if (!answers[date.year][date.day]) {
        answers[date.year][date.day] = { example: {}, actual: {} }
    }

    return answers;

}