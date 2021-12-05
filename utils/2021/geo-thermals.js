export function parseReadings(readings) {
	return readings.map(reading => {

		let coordinatesArray = reading.replace(' -> ', ',').split(',');
		let coordinates = {
			pos1: {
				x: parseInt(coordinatesArray[0]),
				y: parseInt(coordinatesArray[1])
			},
			pos2: {
				x: parseInt(coordinatesArray[2]),
				y: parseInt(coordinatesArray[3])
			}
		}

		coordinates.horizontal = coordinates.pos1.y === coordinates.pos2.y;
		coordinates.vertical = coordinates.pos1.x === coordinates.pos2.x;
		coordinates.diagonal = !coordinates.horizontal && !coordinates.vertical;

		return coordinates;

	});
}

export class GeoThermalMap {
	constructor(fieldSize) {
		this.map = this.initialiseMap(fieldSize);
	}

	initialiseMap(fieldSize) {
		let map = [];

		for (let i = 0; i < fieldSize; i++) {
			map.push([]);
			for (let j = 0; j < fieldSize; j++) {
				map[i].push(0);
			}
		}

		return map;
	}

	drawHorizontal(reading) {
		const yPos = reading.pos1.y;
		const startPos = reading.pos1.x < reading.pos2.x ?
			'pos1' : 'pos2';
		const endPos = startPos === 'pos1' ? 'pos2' : 'pos1';
		let currentPos = reading[startPos].x;

		while (currentPos <= reading[endPos].x) {
			this.map[yPos][currentPos]++;
			currentPos++;
		}

	}

	drawVertical(reading) {
		const xPos = reading.pos1.x;
		const startPos = reading.pos1.y < reading.pos2.y ?
			'pos1' : 'pos2';
		const endPos = startPos === 'pos1' ? 'pos2' : 'pos1';
		let currentPos = reading[startPos].y;

		while (currentPos <= reading[endPos].y) {
			this.map[currentPos][xPos]++;
			currentPos++;
		}
	}

	drawDiagonal(reading) {

		const length = Math.abs(reading.pos1.x - reading.pos2.x) + 1;
		const xIncrease = reading.pos1.x < reading.pos2.x;
		const yIncrease = reading.pos1.y < reading.pos2.y;

		for (let i = 0; i < length; i++) {

			const xPos = xIncrease ? reading.pos1.x + i : reading.pos1.x - i;
			const yPos = yIncrease ? reading.pos1.y + i : reading.pos1.y - i;

			this.map[yPos][xPos]++;
		}
	}

	countOverlaps() {
		let overlapCount = 0;

		this.map.forEach(row => {
			overlapCount += row.filter(position => position > 1).length;
		});

		return overlapCount;
	}

}