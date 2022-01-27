import { retrieveTextFile } from './file-tools';
import { AnswerRecorder } from './answer-recording';

export function runSolutions(requestedDates, solutionTypes) {

	let recorder = new AnswerRecorder();

	requestedDates.forEach(date => {
		solutionTypes.forEach(type => {

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

				recorder.recordAnswer(date, type, i + 1, result, duration);

				console.log(`*** ${date.fileString} (${typeString}) ***`);
				console.log(`Duration: ${(duration)} ms${recorder.getOutcome().bestTime ? ' (new best time!)' : ''}`);

				for (let part = 1; part <= 2; part++) {
					console.log(`Part ${part}: ${result[part]} ${recorder.getOutcome(part) ? `\n  - ${recorder.getOutcome(part)}` : ''}`);
				}

				console.log();

			});

		});
	});

	recorder.writeAnswersToFile();	
	
}