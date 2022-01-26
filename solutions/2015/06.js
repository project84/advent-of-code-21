import { ChristmasLights } from '../../utils/2015/christmas-lights'

export default function (inputFile) {

	let christmasLights = new ChristmasLights(1000, 1000, inputFile);
	console.log(christmasLights.instructions[0]);

	return {
		1: null,
		2: null
	}
}