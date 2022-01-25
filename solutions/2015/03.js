import { Grid } from '../../utils/2015/grid-navigation';
import { deduplicate as arrayDeduplicate } from '../../utils/general/array-tools';

export default function (inputFile) {

	// Initialise santa objects:
	// 0: 2nd year, normal santa
	// 1: 2nd year, robo santa
	// 2: 1st year, normal santa
	let santas = {};
	for (let i = 0; i < 3; i++) {
		santas[i] = new Grid('fixtures/2015/santa-directions.json');
	}

	let directions = inputFile[0].split('');

	directions.forEach((direction, i) => {
		// Move first year santa for every direction and second year santas in turn
		santas[2].move(direction);
		santas[i % 2].move(direction);
	});

	return {
		1: santas[2].getVisitedLocations().length,
		2: arrayDeduplicate([...santas[0].getVisitedLocations(), ...santas[1].getVisitedLocations()]).length
	}
}