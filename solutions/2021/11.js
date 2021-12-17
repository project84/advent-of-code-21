import { DumboOctopi } from '../../utils/2021/dumbo-octopi';

export default function(inputFile) {

	/* Example */
	// Part 1: 1656
	// Part 2: 195

	/* Actual */
	// Part 1: 1620
	// Part 2: 371

	const cavern = new DumboOctopi(inputFile);

	let flashCount100 = 0;
	let synchronisedFlash;
	let i = 0;

	while (!synchronisedFlash) {

		// Add 1 to the energy level of all octopi and reset flashing state
		cavern.map.map(octopus => {
			octopus.value++;
			octopus.flashing = false;
			return octopus;
		});

		// Determine which octopi flash this round and:
		// - update total count of first 100 rounds
		// - check for all octopi flashing
		let flashCount = cavern.flash();
		flashCount100 += i < 100 ? flashCount : 0;
		synchronisedFlash = flashCount < 100 ? 0 : i;

		// Rest energy level of all octopi that flashed
		cavern.map.map(octopus => {
			octopus.value = octopus.value > 9 ? 0 : octopus.value;
			return octopus;
		});

		i++;
	}

	return {
		part1: flashCount100,
		part2: synchronisedFlash + 1
	}

}