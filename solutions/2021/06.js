import { SchoolOfFish } from '../../utils/2021/lantern-fish';

export default function(inputFile) {

	/* Example */
	// Part 1: 5934
	// Part 2: 26984457539

	/* Actual */
	// Part 1: 353079
	// Part 2: 1605400130036

	// Generate school of fish based on input file
	let schoolOfFish = new SchoolOfFish(inputFile[0].split(','));
	let countAt80;

	for (let i = 0; i < 256; i++) {
		
		// Recalculate number of fish for each generation
		schoolOfFish.applyGeneration();

		// Store total fish count after 80 generations
		countAt80 = i === 79 ? schoolOfFish.calculateTotalFish() : countAt80;

	}

	return {
		part1: countAt80,
		part2: schoolOfFish.calculateTotalFish()
	}

}