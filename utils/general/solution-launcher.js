import { getSolutionInfo, retrieveTextFile } from './file-tools';
import { recordAnswer } from './answer-recording';
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

		let recordingOutcome = recordAnswer(date, type, i + 1, result, duration);

		console.log(`*** ${date.fileString} (${typeString}) ***`);
		console.log(`Duration: ${(duration)} ms${recordingOutcome.bestTime ? ' (new best time!)' : ''}`);

		for (let part = 1; part < 3; part++) {
			console.log(`Part ${part}: ${result[part]} ${recordingOutcome[part] ? `\n  - ${recordingOutcome[part]}` : ''}`);
		}

		console.log('');

	});

	
}