import { moveSubmarine, mapMovementCommandsNew } from '../../utils/2021/movement';

export default function (inputFile) {

	const commandList = mapMovementCommandsNew(inputFile);

	/* Example */
	// Step 1: 150
	// Step 2: 900

	/* Actual */
	// Step 1: 2150351
	// Step 2: 1842742223

	const commands = inputFile.map(command => {
		let parts = command.split(' ');

		return {
			direction: parts[0],
			value: parseInt(parts[1])
		}

	});

	return {
		step1: moveSubmarine(commands, false).final,
		step2: moveSubmarine(commands, true).final
	};
}