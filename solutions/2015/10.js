export default function (inputFile) {

	// Possible improvements: https://www.youtube.com/watch?v=ea7lJkEhytA

	let sequence = inputFile[0];
	let lengthAt40;

	for (let i = 0; i < 50; i++) {

		// Find all groups of the same number, then set the sequence to be an empty string
		let groups = sequence.match(/(\d)\1{0,}/g);
		sequence = '';

		// Build the next sequence by looping through the groups
		// Each group is split into the number of occurences, then the digit (i.e. three one's is 31)
		groups.forEach(group => {
			sequence += group.length + group[0];
		});

		// Store answer after 40th iteration
		if (i === 39) {
			lengthAt40 = sequence.length;
		}

	}

	return {
		1: lengthAt40,
		2: sequence.length
	}
}