import { getParsedDate } from './utils/general/date-tools';
import readlineSync from 'readline-sync';

import * as file from './utils/general/file-tools';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv

let datesToRun = [];

if (argv.today) {
	datesToRun.push(getParsedDate());
}

if (argv.year && argv.day) {
	datesToRun.push(getParsedDate(`${argv.year}-12-${argv.day}`))
}

if (!argv.today && !(argv.year && argv.day)) {
	let year = readlineSync.question('Which year would you like to run? ');
	let day = readlineSync.question('Which day would you like to run? ');

	datesToRun.push(`${year}-12-${argv.day}`);
}

datesToRun.forEach(date => {
	const solutionFilePath = `solutions/${date.fileString}.js`;
	const inputFilePath = `input-files/${date.fileString}/${argv.example ? 'example' : 'actual'}.txt`;

	if (file.exists(solutionFilePath) && file.exists(inputFilePath)) {

		// Retrieve input file content for specified day
		const inputFile = file.retrieveTextFile(inputFilePath, true);

		console.log(`Running solution for day ${date.day} of ${date.year}`);
		const startTime = new Date();

		// Run solution for specified day and log result
		const solution = require('./' + solutionFilePath).default(inputFile);
		console.log(`\nStep 1: ${solution.step1}\nStep 2: ${solution.step2}\n`);
		console.log((new Date() - startTime) + ' ms\n');

	} 
});