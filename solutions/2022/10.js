import { sum } from '../../utils/general/array-tools';

export default function (inputFile) {

	const { cycles } = inputFile.reduce(({ cycles, currentCycle, currentValue }, command) => {

		currentCycle++;
		cycles[currentCycle] = currentValue;
		const [, add] = command.split(' ');

		if (isFinite(add)) {
			currentCycle++;
			cycles[currentCycle] = currentValue;
			currentValue += +add;
		}

		return { cycles, currentCycle, currentValue }

	}, { cycles: {}, currentCycle: 0, currentValue: 1 });

	return {
		1: sum(Array.from({ length: 6 }, (_, i) => 20 + i * 40).map((cycle) => cycles[cycle] * cycle)),
		2: null
	}
}