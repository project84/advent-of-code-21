export function sum(inputArray) {
	// Adds all items in a provided array of integers
	return inputArray.reduce((prev, next) => {
		return parseInt(prev) + parseInt(next);
	});
}

export function deduplicate(inputArray) {
	// Convert array 
	const stringified = inputArray.map(item => JSON.stringify(item));
	return [...new Set(stringified)].map(item => JSON.parse(item));
}