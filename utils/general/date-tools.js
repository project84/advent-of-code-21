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

export function getPuzzleDates() {

	// Generates and returns a list of all possible dates that have puzzles
	let dateWindow = getPuzzleDateWindow();

	return Object.keys(dateWindow).flatMap((year) => dateWindow[year].map((day) => ({ year: +year, day })));

}

export function hasPuzzle(year, day) {

	// For a given year / day, checks whether the date has a puzzle (assumes month is December)
	year = parseInt(year);
	day = parseInt(day);

	let dateWindow = getPuzzleDateWindow();

	return Object.keys(dateWindow).map((y) => +y).includes(year) && 
		dateWindow[year].includes(day);

}

export function getPuzzleDateWindow() {

	// Calculates the window of dates that have puzzles, which is the first 25 days of December
	// for every year from 2015 until the current date
	const currentDate = getParsedDate();
	const isDecember = currentDate.month === 11;

	return Object.fromEntries(
		Array.from({ length: (isDecember ? currentDate.year + 1 : currentDate.year) - 2015 }, 
		(_, i) => {
			const year = 2015 + i;
			return [ year, Array.from({ length: year === currentDate.year && isDecember ? currentDate.day : 25 }, (_, i) => i + 1) ]
		})
	);

}