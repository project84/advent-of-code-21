export function getParsedDate(dateString) {
	const rawDate = dateString ? new Date(dateString) : new Date();
	
	let parsedDate = {
		day: rawDate.getDate(),
		month: rawDate.getMonth(),
		year: rawDate.getFullYear()
	}

	parsedDate.fileString = getDateFileString(parsedDate.year, parsedDate.day);

	return parsedDate;
}

export function getDateFileString(year, day) {
	return year + '/' + String(day).padStart(2, '0');
}