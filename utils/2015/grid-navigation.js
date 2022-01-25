import { readFileSync } from 'fs';

export class Grid {

	constructor(mappingFilePath) {

		this.currentPosition = { x: 0, y: 0 };
		this.visitedPositions = { x0y0: 1 };
		this.directionMapping = JSON.parse(readFileSync(mappingFilePath));

	}

	getCurrentPosition() {
		return this.currentPosition();
	}

	getVisitedLocations() {
		return Object.keys(this.visitedPositions);
	}

	move(direction) {

		// Determine movement based on mapping file and update current position
		let movement = this.directionMapping[direction];
		this.currentPosition.x += movement.x;
		this.currentPosition.y += movement.y;

		// Update list of visited locations
		let positionString = `x${this.currentPosition.x}y${this.currentPosition.y}`;
		this.visitedPositions[positionString] = this.visitedPositions[positionString] ? this.visitedPositions[positionString] + 1 : 1;

	}

}