export function sum(inputArray) {
	// Adds all items in a provided array of integers
	return inputArray.reduce((prev, next) => {
		return parseInt(prev) + parseInt(next);
	});
}