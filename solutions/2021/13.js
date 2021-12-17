import { Orgigami } from '../../utils/2021/origami';

export default function(inputFile) {

	let codePuzzle = new Orgigami(inputFile);

	// Separate first instruction from the list, process that fold and determine 
	// the number of coordinates after the fold (part 1 answer)
	const firstIntruction = codePuzzle.instructions.shift();
	codePuzzle.processFold(firstIntruction.foldAlong, firstIntruction.position);
	const dotsAfterFirstFold = codePuzzle.coordinates.length;

	// Process the remaining fold - part 2 answer is the printed code
	codePuzzle.instructions.forEach(instruction => {
		codePuzzle.processFold(instruction.foldAlong, instruction.position);
	});

	return {
		part1: dotsAfterFirstFold,
		part2: codePuzzle.getCodeOuput()
	}

}