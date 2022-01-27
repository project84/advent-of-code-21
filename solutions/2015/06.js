import { ChristmasLights } from '../../utils/2015/christmas-lights'
import { sum as arraySum } from '../../utils/general/array-tools';

export default function (inputFile) {

	let christmasLights = new ChristmasLights(inputFile);
	
	christmasLights.getInstructions().forEach(instruction => {
		christmasLights.processInstruction(instruction);
	});

	return {
		1: arraySum(Object.values(christmasLights.getLights()).map(light => light.a)),
		2: arraySum(Object.values(christmasLights.getLights()).map(light => light.b))
	}
}