import { readFileSync, writeFileSync } from 'fs';

export class AnswerRecorder {

	constructor() {
		this.answers = JSON.parse(readFileSync('fixtures/general/solution-answers.json', 'utf-8'));
	}

	recordAnswer(date, type, index, answer, duration) {

	}

	verifyAnswer(date, type, index, answer) {

		// Reset outcome object and set focus based on input params
		this.outcome = {};
		this.setFocus(date, type, index, !answer.current);

		if (!this.focus) {
			this.outcome.message = 'No current answer recorded for specified date';
			return;
		}

		for (let part = 1; part <= 2; part++) {

			// For each part of the executed iteration, exit iteration if a result has not been provided
			if (answer[part] == null && !answer.current) {
				continue;
			}

			// Check if the answer is already verified and exit iteration if so
			if (this.focus[part].verified) {
				this.outcome[part] = 'verified answer already recorded';
				continue;
			}

			// Otherwise update the answer with the latest attempt or supplied verified answer
			this.focus[part].answer = answer.current ? this.focus[part].answer : answer[part];
			this.focus[part].verified = true;
			this.outcome[part] = 'verified answer recorded!';

		}

	}

	setFocus(date, type, index, createNew = true) {

		this.focus = null;

		if (createNew) {
			// Check if previous answers recorded, otherwise create empty structure for them
			this.answers[date.year] = this.answers[date.year] || {};
			
			this.answers[date.year][date.day] = 
				this.answers[date.year][date.day] || 
				{ example: {}, actual: {} };

			this.answers[date.year][date.day][type][index] = 
			this.answers[date.year][date.day][type][index] || 
				{
					1: { answer: null, verified: false },
					2: { answer: null, verified: false },
				};
		}

		try {
			this.focus = this.answers[date.year][date.day][type][index];
		} catch {
			return;
		}

	}

	writeAnswersToFile() {
		writeFileSync('fixtures/general/solution-answers.json', JSON.stringify(this.answers, null, 4));
	}

}

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
	
	for (let part = 1; part <= 2; part++) {

		// For each part of the executed iteration, exit iteration if a result has not been provided
		if (answer[part] == null && !answer.current) {
			continue;
		}
		
		if (previousAnswer[part].verified) {
			
			if (verified) {
				// If a verified answer is supplied and one already exists, report the error back
				outcome[part] = 'verified answer already recorded... please check and try again';
			} else {
				// If the answer has already been verified, and an unverified answer is supplied, 
				// check if the answer is the same and report back if not
				outcome[part] = answer[part] === previousAnswer[part].answer ? 'Verified!' : `Incorrect... expected: ${previousAnswer[part].answer}`;
			}

		} else {

			// Otherwise update the answer with the latest attempt or supplied verified answer
			previousAnswer[part].answer = answer.current ? previousAnswer[part].answer : answer[part];
			previousAnswer[part].verified = verified;
			outcome[part] = verified ? 'verified answer recorded!' : 'New answer';

		}

	};

	writeFileSync('fixtures/general/solution-answers.json', JSON.stringify(answers, null, 4));
    return outcome;

}

function getPreviousAnswers(date, type, index, createNew = true) {

	// Read previous answers from file
    let answers = JSON.parse(readFileSync('fixtures/general/solution-answers.json', 'utf-8'));

	if (!createNew) {
		return answers;
	}

	// Check if previous answers recorded, otherwise create empty structure for them
	answers[date.year] = answers[date.year] || {};
	answers[date.year][date.day] = answers[date.year][date.day] || { example: {}, actual: {} };
	answers[date.year][date.day][type][index] = 
		answers[date.year][date.day][type][index] || 
		{
			1: { answer: null, verified: false },
			2: { answer: null, verified: false },
		};

    return answers;

}