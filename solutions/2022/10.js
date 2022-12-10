import { sum } from '../../utils/general/array-tools';

export default function (inputFile) {

	const { cycles, image } = inputFile.reduce(({ cycles, currentCycle, currentValue, image }, command) => {

		currentCycle++;
		cycles[currentCycle] = currentValue;

		image += getPixel(currentCycle, currentValue);

		const [, add] = command.split(' ');

		if (isFinite(add)) {
			currentCycle++;
			cycles[currentCycle] = currentValue;

			image+= getPixel(currentCycle, currentValue);
			currentValue += +add;
		}

		return { cycles, currentCycle, currentValue, image }

	}, { cycles: {}, currentCycle: 0, currentValue: 1, image: '' });

	return {
		1: sum(Array.from({ length: 6 }, (_, i) => 20 + i * 40).map((cycle) => cycles[cycle] * cycle)),
		2: image
	}
}

const getPixel = (cycle, value) => {
	const position = (cycle - 1) % 40;
	return `${!position ? '\n' : ''}${ position >= value - 1 && position <= value + 1 ? '#' : '.' }`;
}