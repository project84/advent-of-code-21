import readlineSync from 'readline-sync';
import * as file from './utils/general/file-tools';

// Get current date and set month / year
const currentDate = new Date();
let year = currentDate.getFullYear();
let day = currentDate.getDate();

if (
	currentDate.getMonth() != 11 ||
	readlineSync.question(`Do you wish to run the solution for day ${day} of ${year}? (Y/N) `).toUpperCase() != 'Y'
) {
	// Allows the user to override the determined date
	year = readlineSync.question('Which year would you like to run? ');
	day = readlineSync.question('Which day would you like to run? ');
}

// Determine file paths for solution and input file, and checks if they exist
const dateString = `${year}/${String(day).padStart(2, '0')}`;
const solutionFilePath = `solutions/${dateString}.js`;
const inputFilePath = `input-files/${dateString}.txt`;

const solutionExists = file.exists(solutionFilePath);
const inputExists = file.exists(inputFilePath);

if (solutionExists && inputExists) {

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