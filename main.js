import readlineSync from 'readline-sync';
import * as file from './utils/general/file-tools';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv

let year;
let day;

if (argv.today) {
	// Get current date and set day / year
	const currentDate = new Date();
	year = currentDate.getFullYear();
	day = currentDate.getDate();
} else if (argv.year && argv.day) {
	// Read desired date from command line if specified and today NOT specified
	year = argv.year;
	day = argv.day
} else {
	// Allows the user to select the date to run
	year = readlineSync.question('Which year would you like to run? ');
	day = readlineSync.question('Which day would you like to run? ');
}

// Determine file paths for solution and input file, and checks if they exist
const dateString = `${year}/${String(day).padStart(2, '0')}`;
const solutionFilePath = `solutions/${dateString}.js`;
const inputFilePath = `input-files/${dateString}-${argv.example ? 'example' : 'actual'}.txt`;

if (file.exists(solutionFilePath) && file.exists(inputFilePath)) {

	// Retrieve input file content for specified day
	const inputFile = file.retrieveTextFile(inputFilePath, true);

	console.log(`Running solution for day ${day} of ${year}`);
	const startTime = new Date();

	// Run solution for specified day and log result
	const solution = require('./' + solutionFilePath).default(inputFile);
	console.log(`\nStep 1: ${solution.step1}\nStep 2: ${solution.step2}\n`);
	console.log((new Date() - startTime) + ' ms');

} else {
	// Return error if a file is unavailable and exit
	console.log('Solution or input file not found, check and try again');
}