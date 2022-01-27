import { Cuboid } from '../../utils/general/cuboid';

export default function (inputFile) {

	// Create array of cuboid classes using input dimensions
	let presents = inputFile.map(present => new Cuboid(present.split('x')));

	let total = presents.reduce((total, present) => {

		// Calculate total wrapping paper and ribbon requirement for all presents
		total.wrappingPaper += present.getSurfaceArea() + Math.min(...present.getSides());
		total.ribbon += Math.min(...present.getPerimeter()) + present.getVolume();

		return total;

	}, { wrappingPaper: 0, ribbon: 0 });

	return {
		1: total.wrappingPaper,
		2: total.ribbon
	}
}