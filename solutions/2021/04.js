import { parseBingoBoards } from "../../utils/2021/bingo";

export default function(inputFile) {

	// Retrieve bingo input, and create array of bingo boards
	const bingoNumbers = inputFile.shift().split(',');
	const bingoBoards = parseBingoBoards(inputFile);

	let winners = [];

	bingoNumbers.forEach(number => {

		if (winners.length != bingoBoards.length) {

			bingoBoards.forEach((board, j) => {

				// Mark each number in sequence to each board in the game
				board.checkNumber(number);
	
				if (
					board.checkWin()
					&& !winners.filter(winner => winner.board === j).length
				) {
					// If a board wins, calculate the score and add it to the winner array
					winners.push({
						board: j,
						number: number,
						score: board.calculateScore(number)
					});
				}
			});

		}

	});

	return {
		step1: winners[0].score,
		step2: winners[winners.length - 1].score
	}

}