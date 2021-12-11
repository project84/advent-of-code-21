import { Area } from './area';

export class DumboOctopi extends Area {

	constructor(readings) {
		super(readings);
	}

	flash(count = 0) {

		// Find all octupi that are due to flash, if none exit
		const toFlash = this.map.filter(octopus => octopus.value > 9 && !octopus.flashing);
		if (!toFlash.length) {
			return count;
		}

		// Update count of flashing octopi for the round
		count += toFlash.length;

		toFlash.forEach(octopus => {

			// For each flashing octopus, find adjacent octopi and increase their energy level by one
			octopus.flashing = true;
			const adjacentOctopi = this.getAdjacentPositions(octopus.x, octopus.y, true);

			adjacentOctopi.forEach(adjOctopi => {
				const octIndex = this.map.findIndex(o => {
					return o.x === adjOctopi.x && o.y === adjOctopi.y;
				});

				this.map[octIndex].value++;
			})
		});

		// Continue to recursively search for flashing octopi
		return this.flash(count);
		
	}
	
}