import { moveSubmarine } from '../../utils/2021/movement';

export default function (inputFile) {

	/* Example */
	// Part 1: 150
	// Part 2: 900

	/* Actual */
	// Part 1: 2150351
	// Part 2: 1842742223

	const commands = inputFile.map(command => {
		let parts = command.split(' ');

		return {
			direction: parts[0],
			value: parseInt(parts[1])
		}

	});

	return {
		part1: moveSubmarine(commands, false).final,
		part2: moveSubmarine(commands, true).final
	};
}