import { Orgigami } from "../../utils/2021/origami";

export default function(inputFile) {

	const separator = inputFile.findIndex(row => row === '');
		
	const dotCoordinates = inputFile
		.slice(0, separator)
		.map(coordinate => {
			const parts = coordinate.split(',');
			return {
				x: parts[0],
				y: parts[1]
			}
		});

	const foldInstructions = inputFile
		.slice(separator + 1, inputFile.length)
		.map(instruction => {
			const parts = instruction.split('=');
			return {
				foldAlong: parts[0][parts[0].length - 1],
				position: parts[1]
			}
		});

	console.log(foldInstructions);

	let codePuzzle = new Orgigami(Orgigami.coordinatesToMap(dotCoordinates));
	
	

	// console.log(JSON.stringify(Orgigami.coordinatesToMap(dotCoordinates)));

	return {
		step1: null,
		step2: null
	}

}