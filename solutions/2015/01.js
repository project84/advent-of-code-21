export default function (inputFile) {

	// Create array of individual instructions and count up / down instructions
	let directions = inputFile[0].split('');
	let countUp = directions.filter(direction => direction === '(').length;
	let countDown = directions.filter(direction => direction === ')').length;

	let currentPosition = 0;
	let directionsProcessed = 0;

	while (currentPosition >= 0 && directions.length) {

		// Parse instructions until a basement floor is reached
		currentPosition += directions.shift() === '(' ? 1 : -1;
		directionsProcessed++;

	}

	return {
		1: countUp - countDown,
		2: directionsProcessed
	}
}