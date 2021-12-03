import readlineSync from 'readline-sync';
import * as file from './utils/general/file-tools';

const currentDate = new Date();
let year = currentDate.getFullYear();
let day = currentDate.getDate();

if (
  currentDate.getMonth() != 11 || 
  readlineSync.question(`Do you wish to run the solution for day ${day} of ${year}? (Y/N) `).toUpperCase() != 'Y'
) {
  year = readlineSync.question('Which year would you like to run? ');
  day = readlineSync.question('Which day would you like to run? ');
}

const dateString = `${year}/${String(day).padStart(2, '0')}`;
const solutionFilePath = `solutions/${dateString}.js`;
const inputFilePath = `input-files/${dateString}.txt`;

const solutionExists = file.exists(solutionFilePath);
const inputExists = file.exists(inputFilePath);

if (solutionExists && inputExists) {

	const inputFile = file.retrieveTextFile(inputFilePath, true);

	console.log(`Running solution for day ${day} of ${year}`);
    const startTime = new Date();

	const solution = require('./' + solutionFilePath).default(inputFile);
	console.log(`\nStep 1: ${solution.step1}\nStep 2: ${solution.step2}\n`);
    console.log((new Date() - startTime) + ' ms');

} else {
	console.log('Solution or input file not found, check and try again');
}