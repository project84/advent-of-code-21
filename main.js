import { getSolutionsToRun, getFileTypes, runSolution } from './utils/general/solution-launcher';
import { getSolutionTypes } from './utils/general/cli-tools';

const solutionsToRun = getSolutionsToRun();

if (!solutionsToRun.length) {
	console.log('No solutions available to run, please check and try again');
}

solutionsToRun.forEach(date => {

	getSolutionTypes().forEach(type => {
		
		runSolution(date, type);

	});

});