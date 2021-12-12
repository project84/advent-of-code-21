import { getSolutionsToRun, getFileTypes, runSolution } from './solution-launcher';

const solutionsToRun = getSolutionsToRun();

if (!solutionsToRun.length) {
	console.log('No solutions available to run, please check and try again');
}

const fileTypes = getFileTypes();

solutionsToRun.forEach(date => {

	fileTypes.forEach(type => {
		
		const answer = runSolution(date, type);

		console.log(`${date.fileString} (${type}) - ${(answer.duration)} ms`);
		console.log(`Step 1: ${answer.step1}\nStep 2: ${answer.step2}\n`);

	});

});