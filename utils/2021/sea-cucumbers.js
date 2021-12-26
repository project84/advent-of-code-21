import { Area } from '../general/area';

export class SeaCucumbers extends Area {

	constructor(inputFile) {
		super(inputFile);
		
		this.map = this.map.map(position => {

			// Additionally determine potential next position for either cucumber type
			position.next = {
				'>': this.getRelativeIndex(position.x, position.y, 1) ||
					this.getPositionIndex(0, position.y),
				v: this.getRelativeIndex(position.x, position.y, 0, 1) ||
					this.getPositionIndex(position.x, 0)
			};

			return position;
			
		});
	}

	getPossibleMoves(cucumberDirection) {

		// A cucumber can move if there is a free space
		// in it's potential next position
		return this.map.filter(position => {
			return position.value === cucumberDirection 
				&& this.map[position.next[cucumberDirection]].value === '.'
		});
		
	}

	moveCucumbers(cucumbersToMove) {

		cucumbersToMove.forEach(cucumber => {
			
			// Apply each identified cucumber movement
			this.map[cucumber.next[cucumber.value]].value = cucumber.value;
			this.map[cucumber.index].value = '.';
		});

		// Return number of movements executed
		return cucumbersToMove.length;
		
	}
	
}