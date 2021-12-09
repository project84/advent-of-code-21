import readlineSync from 'readline-sync';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { getSolutionInfo, retrieveTextFile, getFilteredSolutionList } from './utils/general/file-tools';
import { deduplicate as deduplicateArray } from './utils/general/array-tools';

const argv = yargs(hideBin(process.argv)).argv

let datesToRun = [];

// Set dates to run based on CLI inputs or queries
if (argv.all) {
	let solutionList = getFilteredSolutionList();
	solutionList.forEach(solution => {
		datesToRun.push(getSolutionInfo(solution.year, solution.day));
	});
}

if (argv.year && !argv.day) {
	let solutionList = getFilteredSolutionList(argv.year)
	solutionList.forEach(solution => {
		datesToRun.push(getSolutionInfo(solution.year, solution.day));
	});
}

if (argv.currentMonth || argv.currentYear) {
	let solutionList = getFilteredSolutionList(new Date().getFullYear());
	solutionList.forEach(solution => {
		datesToRun.push(getSolutionInfo(solution.year, solution.day));
	});
}

if (argv.today) {
	datesToRun.push(getSolutionInfo());
}

if (argv.year && argv.day) {
	datesToRun.push(getSolutionInfo(argv.year, argv.day));
}

if (!datesToRun.length) {
	let year = readlineSync.question('Which year would you like to run? ');
	let day = readlineSync.question('Which day would you like to run? ');

	datesToRun.push(getSolutionInfo(year, day));
}

// Remove duplicates and filter to only dates with solution and input files available
datesToRun = deduplicateArray(datesToRun).filter(date => {
	return date.solution.exists && date.example.exists && date.actual.exists;
});

if (!datesToRun.length) {
	console.log('No solutions available to run, please check and try again');
}

// Determine files to be run based on CLI commands
let filesToRun = [ 'example', 'actual' ];
if (argv.example != argv.actual) {

	filesToRun = !argv.example ? filesToRun.filter(type => type != 'example') : filesToRun;
	filesToRun = !argv.actual ? filesToRun.filter(type => type != 'actual') : filesToRun;

} 

datesToRun.forEach(date => {

	filesToRun.forEach(type => {
		
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