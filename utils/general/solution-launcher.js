import readlineSync from 'readline-sync';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { getSolutionInfo, getFilteredSolutionList, retrieveTextFile } from './file-tools';
import { deduplicate as deduplicateArray } from './array-tools';
import { writeFileSync } from 'fs';

const argv = yargs(hideBin(process.argv)).argv

export function getSolutionsToRun() {
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
		return date.solution.exists && date.exampleExists && date.actualExists;
	});

	return datesToRun;
}

export function getFileTypes() {
	// Determine files to be run based on CLI commands
	let filesToRun = [ 'example', 'actual' ];
	if (argv.example != argv.actual) {

		filesToRun = !argv.example ? filesToRun.filter(type => type != 'example') : filesToRun;
		filesToRun = !argv.actual ? filesToRun.filter(type => type != 'actual') : filesToRun;

	}

	return filesToRun;
}

export function runSolution(date, type) {

	const toRun = date[type].length;

	date[type].forEach((path, i) => {

		// Retrieve input file
		const inputFile = retrieveTextFile(path, true);
		const startTime = new Date();

		// Run solution for specified day and log result
		const result = require('../../' + date.solution.path).default(inputFile);

		const endTime = new Date();
		const duration = endTime - startTime;

		const typeString = type + (toRun > 1 ? `-${i + 1}` : '');

		console.log(`${date.fileString} (${typeString}) - ${(duration)} ms`);
		console.log(`Step 1: ${result.step1}\nStep 2: ${result.step2}`);
		console.log(recordResult(date, type, i, result, duration));

	})

	
}

export function recordResult(date, type, index, result, duration) {

	let results = require('../../fixtures/general/solution-results.json');
	let solutionInfo = results.filter(result => result.year === date.year && result.day === date.day)[0];
	let outcome;

	if (!solutionInfo) {
		let newSolution = { year: date.year, day: date.day, example: [], actual: [] };
		newSolution[type][index] = { part1: result.step1, part2: result.step2, durationMs: duration, verified: false };
		results.push(newSolution);
		outcome = 'New result recorded.\n';
	} else {
		let previousResult = solutionInfo[type][index];
		if (!previousResult) {
			solutionInfo[type][index] = { part1: result.step1, part2: result.step2, durationMs: duration, verified: false };
			outcome = 'New result recorded.\n';
		} else {
			previousResult.durationMs = duration < previousResult.durationMs ? duration : previousResult.durationMs;

			if (previousResult.verified) {
				outcome = result.step1 === previousResult.part1 && result.step2 === previousResult.part2 ?
					'Result verified!\n' :
					`Result differs from known result... expected:\nPart 1: ${previousResult.part1}\nPart 2: ${previousResult.part2}\n`;
			} else {
				solutionInfo[type][index].part1 = result.step1;
				solutionInfo[type][index].part2 = result.step2;
				outcome = 'No verified result known, updated existing result.\n';
			}
		}
	}

	writeFileSync('fixtures/general/solution-results.json', JSON.stringify(results, null, 4));
	return outcome;

}