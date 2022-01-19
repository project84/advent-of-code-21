import { getSolutionInfo, retrieveTextFile } from './file-tools';
import { recordAnswer } from './result-recording';
import { getRequestedDates } from './cli-tools';

const argv = require('minimist')(process.argv.slice(2));

export function getSolutionsToRun() {

	return getRequestedDates()
		.map(date => getSolutionInfo(date.year, date.day))
		.filter(date => date.solution.exists && date.exampleExists && date.actualExists);

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

		const typeString = toRun > 1 ? `${type} #${i + 1}` : type;

		console.log(`${date.fileString} (${typeString}) - ${(duration)} ms`);
		console.log(`Part 1: ${result.part1}\nPart 2: ${result.part2}`);
		console.log(recordAnswer(date, type, i + 1, result, duration));

	})

	
}