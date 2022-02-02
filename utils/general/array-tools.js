export function sum(inputArray) {

	// If there are no items in the array, sum is 0 (blocks failure on attempting to reduce 0 item array)
	if (!inputArray.length) {
		return 0;
	}

	// Adds all items in a provided array of integers
	return inputArray.reduce((prev, next) => {
		return parseInt(prev) + parseInt(next);
	});
}

export function multiply(inputArray) {

	// If there are no items in the array, product is 0 (blocks failure on attempting to reduce 0 item array)
	if (!inputArray.length) {
		return 0;
	}

	// Multiply all items in a provided array of integers
	return inputArray.reduce((prev, next) => {
		return parseInt(prev) * parseInt(next);
	});
}

export function deduplicate(inputArray) {
	// Convert array 
	const stringified = inputArray.map(item => JSON.stringify(item));
	return [...new Set(stringified)].map(item => JSON.parse(item));
}