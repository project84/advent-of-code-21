import { getSolutionsToRun, runSolution, runSolutions } from './utils/general/solution-launcher';

import { argv, getRequestedDates, getSolutionTypes, validateAnswerVerificationParams } from './utils/general/cli-tools';
import { writeFile } from './utils/general/file-tools';
import { verifyAnswers } from './utils/general/answer-verification';

try {

	let requestedDates = getRequestedDates();
	const solutionTypes = getSolutionTypes();

	if (argv.verify) {

		let params = validateAnswerVerificationParams(requestedDates, solutionTypes);
		verifyAnswers(requestedDates, solutionTypes, params);

	}

	if (argv.solution) {

		let solutionsToRun = requestedDates.filter(date => date.solution.exists && date.exampleExists && date.actualExists);

		if (!solutionsToRun.length) {
			throw new Error('No solutions available to run');
		}

		runSolutions(solutionsToRun, solutionTypes);

	}

} catch (err) {
	console.error('ERROR: ' + err.message);
	writeFile('logs/error.txt', err.stack);
}

// const solutionsToRun = getSolutionsToRun();

// if (!solutionsToRun.length) {
// 	console.log('No solutions available to run, please check and try again');
// }

// solutionsToRun.forEach(date => {

// 	getSolutionTypes().forEach(type => {
		
// 		runSolution(date, type);

// 	});

// });