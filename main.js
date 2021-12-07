import readlineSync from 'readline-sync';

import { getSolutionInfo, retrieveTextFile } from './utils/general/file-tools';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv

let datesToRun = [];

// Set dates to run based on CLI inputs or queries
if (argv.today) {
	datesToRun.push(getSolutionInfo());
}

if (argv.year && argv.day) {
	datesToRun.push(getSolutionInfo(argv.year, argv.day));
}

if (!argv.today && !(argv.year && argv.day)) {
	let year = readlineSync.question('Which year would you like to run? ');
	let day = readlineSync.question('Which day would you like to run? ');

	datesToRun.push(getSolutionInfo(year, day));
}

// Filter to only dates with solution and input files available
datesToRun = datesToRun.filter(date => {
	return date.solution.exists && date.example.exists && date.actual.exists;
});

if (!datesToRun.length) {
	console.log('No solutions available to run, please check and try again');
}

datesToRun.forEach(date => {

	['example', 'actual'].forEach(type => {
		
		// Retrieve input file
		const inputFile = retrieveTextFile(date[type].path, true);
		const startTime = new Date();

		// Run solution for specified day and log result
		const solution = require('./' + date.solution.path).default(inputFile);

		const endTime = new Date();

		console.log(`${date.fileString} (${type}) - ${(endTime - startTime)} ms`);
		console.log(`Step 1: ${solution.step1}\nStep 2: ${solution.step2}\n`);

	});

});