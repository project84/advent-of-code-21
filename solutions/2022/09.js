import { Knot } from "../../utils/2022/rope-knots";

export default function (inputFile) {

	// Create a rope of 10 knots
	const rope = Array.from({ length: 10 }, () => new Knot());

	inputFile.forEach((command) => {

		const [ direction, distance ] = command.split(' ');

		for (let i = 0; i < +distance; i++) {
			
			// Move rope head incrementally, one position at a time
			rope[0].move(direction);

			for (let j = 1; j < 10; j++) {
				// After each head movement, calculate each tail knot position in order
				rope[j].followHead(rope[j - 1], direction);
			}
			
		}

	});

	return {
		1: rope[1].visited.size,
		2: rope[9].visited.size
	}
}