import { readFileSync, writeFileSync } from 'fs';

export function recordAnswer(date, type, index, answer, duration, verified = false) {

	// Retrieve and check previous answers for the date supplied and input file type
    let answers = getPreviousAnswers(date, type, index);
	let previousAnswer = answers[date.year][date.day][type][index];
	let outcome = {};	

	// Check for new best time and update accordingly
	if (duration < (previousAnswer.durationMs || Infinity)) {
		previousAnswer.durationMs = duration;
		outcome.bestTime = true;
	}
	
	for (let part = 1; part < 3; part++) {

		// For each part of the executed iteration, continue only if a result has been provided
		if ((answer[part] == null)) {
			continue;
		}
		
		if (previousAnswer[part].verified) {
			
			if (verified) {
				// If a verified answer is supplied and one already exists, report the error back
				outcome[part] = 'verified answer already recorded... please check and try again';
			} else {
				// If the answer has already been verified, and an unverified answer is supplied, 
				// check if the answer is the same and report back if not
				outcome[part] = answer[part] === previousAnswer[part].answer ? 'verified!' : `incorrect... expected: ${previousAnswer[part].answer}`;
			}

		} else {

			// Otherwise update the answer with the latest attempt
			previousAnswer[part].answer = answer[part];
			previousAnswer[part].verified = verified;
			outcome[part] = verified ? 'verified answer recorded!' : 'new answer';

		}

	};

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
			1: { answer: null, verified: false },
			2: { answer: null, verified: false },
		}
	}

    return answers;

}