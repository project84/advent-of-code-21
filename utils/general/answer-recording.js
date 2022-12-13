import { readFileSync, writeFileSync } from 'fs';

export class AnswerRecorder {

	constructor() {
		this.answers = JSON.parse(readFileSync('fixtures/general/solution-answers.json', 'utf-8'));
	}

	getOutcome(part) {
		return part ? this.outcome[part] : this.outcome;
	}

	recordAnswer(date, type, index, answer, duration) {

		// Reset outcome object and set focus based on input params
		this.outcome = {};
		this.setFocus(date, type, index);

		// Check for new best time and update accordingly
		let previousDuration = this.focus.durationMs;
		if (this.focus[1].verified && this.focus[2].verified && duration < (Number.isInteger(previousDuration) ? previousDuration : Infinity)) {
			this.focus.durationMs = duration;
			this.outcome.bestTime = true;
			this.updated = true;
		}

		for (let part = 1; part <= 2; part++) {

			// For each part of the executed iteration, exit iteration if a result has not been provided
			if (answer[part] == null) {
				continue;
			}

			// If the answer has already been verified, check if the new answer is the same and report back if not
			if (this.focus[part].verified) {				
				this.outcome[part] = answer[part] === this.focus[part].answer ? 'Verified!' : `Incorrect... expected: ${this.focus[part].answer}`;
				continue;
			}

			// Otherwise update the answer with the latest attempt
			this.focus[part].answer = answer[part];
			this.focus[part].verified = false;
			this.outcome[part] = 'New answer';
			this.updated = true;

		}

	}

	verifyAnswer(date, type, index, answer) {

		// Reset outcome object and set focus based on input params
		this.outcome = {};
		this.setFocus(date, type, index, !answer.current);

		// Exit answer verification if focus hasn't been set
		if (!this.focus) {
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

			// Otherwise update the answer with the supplied verified answer
			this.focus[part].answer = answer.current ? this.focus[part].answer : answer[part];
			this.focus[part].verified = true;
			this.outcome[part] = 'verified answer recorded!';
			this.updated = true;

		}

	}

	checkAnswerExists(date, type, index) {

		try {
			return this.answers[date.year][date.day][type][index] != null;
		} catch {
			return false;
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
			return;
		} catch {
			return;
		}

	}

	writeAnswersToFile() {

		// No need to write to file if no answers have been updated
		if (!this.updated) {
			return;
		}

		writeFileSync('fixtures/general/solution-answers.json', JSON.stringify(this.answers, null, 4));
	}

	printKnownAnswer(date, type, index) {

		// Set focus, exiting if the requested answer is not known
		this.setFocus(date, type, index, false);
		if (!this.focus) {
			return;
		}

		// Log current known duration for answer
		console.log(`Best time: ${this.focus.durationMs} ms`);

		for (let part = 1; part <= 2; part++) {

			let record = this.focus[part];
			if (!record.answer) {
				continue;
			}

			console.log(`Part ${part}: ${record.answer}\n  - ${record.verified ? `Verified!` : 'Not verified...'}`);
		}
		

	}

}