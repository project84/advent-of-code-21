import { SeatingArrangement } from '../../utils/2015/seating-arrangement'

export default function (inputFile) {

	// Initialise seating arrangement class and calculate initial score
	let seatingArrangement = new SeatingArrangement(inputFile);
	let initialScore = seatingArrangement.getArrangements().reduce((score, arrangement) => {
		let arrangementScore = seatingArrangement.calculateArrangementScore(arrangement)
		return arrangementScore > score ? arrangementScore : score;
	}, 0);

	// Add new guest and reset arrangements
	let newGuest = 'Me!';
	seatingArrangement.getGuests().forEach(guest => {
		seatingArrangement.addRelationship(newGuest, guest, 0);
	});

	seatingArrangement
		.addGuest(newGuest)
		.resetArrangements();

	// Calculate revised score with new guest included
	let revisedScore = seatingArrangement.getArrangements().reduce((score, arrangement) => {
		let arrangementScore = seatingArrangement.calculateArrangementScore(arrangement)
		return arrangementScore > score ? arrangementScore : score;
	}, 0);

	return {
		1: initialScore,
		2: revisedScore
	}
}