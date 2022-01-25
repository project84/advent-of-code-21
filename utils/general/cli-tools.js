import readlineSync from 'readline-sync';
import { getParsedDate, getPuzzleDates, hasPuzzle } from './date-tools';
import { getSolutionInfo } from './file-tools';
import { deduplicate as deduplicateArray } from './array-tools';

export const argv = require('minimist')(process.argv.slice(2));

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

    // Return list of requested dates with duplicates removed and sorted by date
    return deduplicateArray(requestedDates)
        .sort((a, b) => {
            if (a.year === b.year) {
                return a.day - b.day;
            }
            return a.year > b.year ? 1 : -1;
        })
        .map(date => getSolutionInfo(date.year, date.day));

}

export function getSolutionTypes() {

	// Determine solution type requested based on CLI commands
	let solutionTypes = [ 'example', 'actual' ];
	if (argv.example != argv.actual) {

		solutionTypes = !argv.example ? solutionTypes.filter(type => type != 'example') : solutionTypes;
		solutionTypes = !argv.actual ? solutionTypes.filter(type => type != 'actual') : solutionTypes;

	}

	return solutionTypes;
}

export function validateAnswerVerificationParams(requestedDates, solutionTypes) {

    // Validates the requested attempt to verify solution answers, blocking invalid
    // or unintended combinations
    if (!requestedDates.length) {
        throw new Error('No valid date(s) specified.');
    }

    let answerSpecified = argv.part1 || argv.part2;

    if (!argv.currentAnswer && !answerSpecified) {
        throw new Error('Must either verify the current answer or specify a verified answer.');
    }

    if (argv.currentAnswer && answerSpecified) {
        throw new Error('Cannot verify the current answer and specify a verified answer.');
    }

    // The following checks assume that, in all but exceptional cases, the solution for 
    // different days / puzzles and example vs actual will always be different
    if (requestedDates.length > 1 && answerSpecified) {
        throw new Error('Cannot specify a verified answer for multiple dates.');
    }

    if (solutionTypes.length > 1 && answerSpecified) {
        throw new Error('Cannot specify a verified answer for both example and actual solutions.');
    }

    if (requestedDates.length > 1 && argv.index > 1) {
        throw new Error('Cannot specify a non-default puzzle index for multiple dates.');
    }

    if (solutionTypes.length > 1 && argv.index > 1) {
        throw new Error('Cannot specify a non-default puzzle index for both example and actual solutions.');
    }

    let dateHasMultiplePuzzles = requestedDates.some(date => date.example.length > 1 || date.actual.length > 1);
    if (dateHasMultiplePuzzles && answerSpecified && !argv.index) {
        throw new Error('Cannot specify a verified answer for a date with multiple puzzles without specifying the puzzle to verify.');
    }

    return {
        current: argv.currentAnswer,
        1: argv.part1,
        2: argv.part2,
        index: argv.index
    }

}

export function validateInitialisationParams(requestedDates) {

    // Validates the requested attempt to initialise a solution, blocking invalid
    // or unintended combinations
    if (!requestedDates.length) {
        throw new Error('No valid date(s) specified.');
    }

    if (requestedDates.length > 1) {
        throw new Error('Only one solution can be initialised at a time');
    }

    let solutionToInitialise = requestedDates[0];
    if (solutionToInitialise.solution.exists) {
        throw new Error('Solution already initialised');
    }

    return {
        date: solutionToInitialise.fileString,
        path: solutionToInitialise.solution.path,
        1: argv.part1
    };

}