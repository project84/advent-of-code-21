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
	let puzzleDates = [];

	for (let year = dateWindow.earliest.year; year <= dateWindow.latest.year; year++) {

		let targetDay = year <= dateWindow.latest.year ? 25 : dateWindow.latest.day;

		for (let day = dateWindow.earliest.day; day <= targetDay; day++) {
			puzzleDates.push({ year, day });
		};

	}

	return puzzleDates;

}

export function hasPuzzle(year, day) {

	// For a given year / day, checks whether the date has a puzzle (assumes month is December)
	year = parseInt(year);
	day = parseInt(day);

	let dateWindow = getPuzzleDateWindow();

	let yearValid = year >= dateWindow.earliest.year && year <= dateWindow.latest.year;
	let dayValid = day >= 1 && day <= (year === dateWindow.latest.year ? dateWindow.latest.day : 25);

	return yearValid && dayValid;

}

export function getPuzzleDateWindow() {

	// Calculates the window of dates that have puzzles, which is the first 25 days of December
	// for every year from 2015 until the current date
	let currentDate = getParsedDate();

	return {
		earliest: {
			year: 2015,
			day: 1
		},
		latest: {
			year: currentDate.month === 11 ? currentDate.year : currentDate.year - 1,
			day: currentDate.month === 11 ? currentDate.day : 25
		}
	}

}