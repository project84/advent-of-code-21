import { argv, getRequestedDates, getSolutionTypes, validateAnswerVerificationParams, validateInitialisationParams } from './utils/general/cli-tools';
import { runSolutions } from './utils/general/solution-launcher';
import { printKnownAnswers, verifyAnswers } from './utils/general/answer-verification';
import { writeFile } from './utils/general/file-tools';
import { copyFileSync, mkdirSync } from 'fs';

try {

	let requestedDates = getRequestedDates();
	const solutionTypes = getSolutionTypes();

	let exType = argv.exType;

	switch (exType) {

		case 'solution':
			// Filter requested dates to only those where the solution exists, exiting if there are none
			let solutionsToRun = requestedDates.filter(date => date.solution.exists && date.exampleExists && date.actualExists);
			if (!solutionsToRun.length) {
				throw new Error('No solutions available to run');
			}

			runSolutions(solutionsToRun, solutionTypes);
			break;

		case 'verify':
			// Validate input parameters, then verify solutions
			let verifyParams = validateAnswerVerificationParams(requestedDates, solutionTypes);
			verifyAnswers(requestedDates, solutionTypes, verifyParams);
			break;

		case 'known':
			// Print known answers for requested dates
			printKnownAnswers(requestedDates, solutionTypes);
			break;

		case 'initialise':
			// Validate input parameters for solution initialisation
			let initialiseParams = validateInitialisationParams(requestedDates);

			// Create empty solution file for the requested date, and empty input file folder
			copyFileSync('fixtures/general/solution-template.js', initialiseParams.path);
			mkdirSync('input-files/' + initialiseParams.date);

			// Record verified answer if supplied
			if (initialiseParams['1']) {
				verifyAnswers(requestedDates, [ 'example' ], initialiseParams);
			}
			
			console.log(initialiseParams.date + ' solution initialised - input files must be added to the repo manually.');

	}

} catch (err) {
	console.error('ERROR: ' + err.message);
	writeFile('logs/error.txt', err.stack);
}