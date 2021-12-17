import { getSolutionsToRun, getFileTypes, runSolution } from './utils/general/solution-launcher';

const solutionsToRun = getSolutionsToRun();

if (!solutionsToRun.length) {
	console.log('No solutions available to run, please check and try again');
}

const fileTypes = getFileTypes();

solutionsToRun.forEach(date => {

	fileTypes.forEach(type => {
		
		runSolution(date, type);

	});

});