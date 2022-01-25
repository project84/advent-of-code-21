import { argv, getRequestedDates, getSolutionTypes, validateAnswerVerificationParams, validateInitialisationParams } from './utils/general/cli-tools';
import { runSolutions } from './utils/general/solution-launcher';
import { printKnownAnswers, verifyAnswers } from './utils/general/answer-verification';
import { writeFile } from './utils/general/file-tools';
import { copyFileSync, mkdirSync } from 'fs';

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

	if (argv.initialise) {

		let params = validateInitialisationParams(requestedDates);
		copyFileSync('fixtures/general/solution-template.js', params.path);
		mkdirSync('input-files/' + params.date);

		if (params['1']) {
			verifyAnswers(requestedDates, [ 'example' ], params);
		}
		
		console.log(params.date + ' solution initialised - input files must be added to the repo manually.')

	}

} catch (err) {
	console.error('ERROR: ' + err.message);
	writeFile('logs/error.txt', err.stack);
}