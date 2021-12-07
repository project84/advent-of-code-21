export function getParsedDate(dateString) {

	// Create date object from input value
	const rawDate = dateString ? new Date(dateString) : new Date();
	
	// Deserialise date into constituent parts
	let parsedDate = {
		day: rawDate.getDate(),
		month: rawDate.getMonth(),
		year: rawDate.getFullYear()
	}

	// Retrieve and set file string for date
	parsedDate.fileString = getDateFileString(parsedDate.year, parsedDate.day);

	return parsedDate;
}

export function getDateFileString(year, day) {
	return year + '/' + String(day).padStart(2, '0');
}