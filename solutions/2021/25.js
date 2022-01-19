import { SeaCucumbers } from '../../utils/2021/sea-cucumbers';

export default function(inputFile) {

	let seaCucumbers = new SeaCucumbers(inputFile);

	let i = 0;
	let cucumbersMoved;
	
	do {

		// Each step, reset count of movements, then move horizontal then vertical cucumbers
		cucumbersMoved = 0;
		cucumbersMoved += seaCucumbers.moveCucumbers(seaCucumbers.getPossibleMoves('>'));
		cucumbersMoved += seaCucumbers.moveCucumbers(seaCucumbers.getPossibleMoves('v'));

		i++;
		
	} while (cucumbersMoved);

	return {
		1: i,
		2: null
	}
	
}