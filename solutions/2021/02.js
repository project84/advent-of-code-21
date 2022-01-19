import { moveSubmarine } from '../../utils/2021/movement';

export default function (inputFile) {

	const commands = inputFile.map(command => {
		let parts = command.split(' ');

		return {
			direction: parts[0],
			value: parseInt(parts[1])
		}

	});

	return {
		1: moveSubmarine(commands, false).final,
		2: moveSubmarine(commands, true).final
	};
}