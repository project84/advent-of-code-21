import { argv, getRequestedDates, getSolutionTypes, validateAnswerVerificationParams } from './utils/general/cli-tools';
import { runSolutions } from './utils/general/solution-launcher';
import { printKnownAnswers, verifyAnswers } from './utils/general/answer-verification';
import { writeFile } from './utils/general/file-tools';
import { AnswerRecorder } from './utils/general/answer-recording';

let recorder = new AnswerRecorder();

try {

	let requestedDates = getRequestedDates();
	const solutionTypes = getSolutionTypes();

	if (argv.solution) {

		let solutionsToRun = requestedDates.filter(date => date.solution.exists && date.exampleExists && date.actualExists);

		if (!solutionsToRun.length) {
			throw new Error('No solutions available to run');
		}

		runSolutions(solutionsToRun, solutionTypes);

	}

	if (argv.verify) {

		let params = validateAnswerVerificationParams(requestedDates, solutionTypes);
		verifyAnswers(requestedDates, solutionTypes, params);

	}

	if (argv.known) {

		printKnownAnswers(requestedDates, solutionTypes);

	}

} catch (err) {
	console.error('ERROR: ' + err.message);
	writeFile('logs/error.txt', err.stack);
}