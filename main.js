import { argv, getRequestedDates, getSolutionTypes, validateAnswerVerificationParams, validateInitialisationParams } from './utils/general/cli-tools';
import { runSolutions } from './utils/general/solution-launcher';
import { printKnownAnswers, verifyAnswers } from './utils/general/answer-verification';
import { writeFile } from './utils/general/file-tools';
import { copyFileSync, mkdirSync } from 'fs';

try {

	let requestedDates = getRequestedDates();
	const solutionTypes = getSolutionTypes();

	if (argv.solution) {

		// Filter requested dates to only those where the solution exists, exiting if there are none
		let solutionsToRun = requestedDates.filter(date => date.solution.exists && date.exampleExists && date.actualExists);
		if (!solutionsToRun.length) {
			throw new Error('No solutions available to run');
		}

		runSolutions(solutionsToRun, solutionTypes);

	}

	if (argv.verify) {

		// Validate input parameters, then verify solutions
		let params = validateAnswerVerificationParams(requestedDates, solutionTypes);
		verifyAnswers(requestedDates, solutionTypes, params);

	}

	if (argv.known) {

		// Print known answers for requested dates
		printKnownAnswers(requestedDates, solutionTypes);

	}

	if (argv.initialise) {

		// Validate input parameters for solution initialisation
		let params = validateInitialisationParams(requestedDates);

		// Create empty solution file for the requested date, and empty input file folder
		copyFileSync('fixtures/general/solution-template.js', params.path);
		mkdirSync('input-files/' + params.date);

		// Record verified answer if supplied
		if (params['1']) {
			verifyAnswers(requestedDates, [ 'example' ], params);
		}
		
		console.log(params.date + ' solution initialised - input files must be added to the repo manually.')

	}

} catch (err) {
	console.error('ERROR: ' + err.message);
	writeFile('logs/error.txt', err.stack);
}