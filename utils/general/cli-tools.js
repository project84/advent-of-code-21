import readlineSync from 'readline-sync';
import { getParsedDate, getPuzzleDates, hasPuzzle } from './date-tools';
import { deduplicate as deduplicateArray } from './array-tools';

const argv = require('minimist')(process.argv.slice(2));

export function getRequestedDates() {

    // Generates a list of dates requested by CLI properties
    let currentDate = getParsedDate();
    let puzzleDates = getPuzzleDates();
    let requestedDates = [];

    // Allows the user to include all dates with a puzzle
    if (argv.all) {
        requestedDates.push(...puzzleDates);
    }

    // Allows the user to specify a year only, including all dates with a puzzle from that year
    if (argv.year && !argv.day) {
        requestedDates.push(...puzzleDates.filter(date => date.year === argv.year));
    }

    // The currentMonth / currentYear properties are equivalent as the only month with puzzles is Decemeber
    // Allows the user to include all dates with a puzzle from the current year
    if (argv.currentMonth || argv.currentYear) {
        requestedDates.push(...puzzleDates.filter(date => date.year === currentDate.year));
    }

    // Allows the user to specify a specific year and day, if that date could have a puzzle
    // Assumes the month is December
    if (argv.year && argv.day && hasPuzzle(argv.year, argv.day)) {
        requestedDates.push({ year: parseInt(argv.year), day: parseInt(argv.day) });
    }

    // Allows the user to specify one or more dates as a date string (i.e. 2021/13), if those dates have a puzzle
    // Assumes the month is December
    if (argv.dates) {
        argv.dates.split(',').forEach(date => {
            
            date = date.split('/');
            let year = parseInt(date[0]);
            let day = parseInt(date[1]);

            if (hasPuzzle(year, day)) {
                requestedDates.push({ year, day });
            }
            
        });
    }

    // If no valid dates have yet been requested OR the user has specifically requested today's puzzle
    // adds todays date to the list IF it is currently December AND the current date has a puzzle
    if ((!requestedDates.length || argv.today) && currentDate.month === 11 && hasPuzzle(currentDate.year, currentDate.day)) {
        requestedDates.push({ year: currentDate.year, day: currentDate.day });
    }

    // If no valid dates have been requested from all other parameters, query the user through CLI for desired date
    if (!requestedDates.length) {
        let year = readlineSync.question('Which year would you like to run? ');
		let day = readlineSync.question('Which day would you like to run? ');

        if (hasPuzzle(year, day)) {
            requestedDates.push({ year, day });
        }

    }

    return deduplicateArray(requestedDates);

}