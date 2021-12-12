export function parseBingoBoards(inputFile) {

	// Create array of bingo board instances from input file
	const totalBoards = inputFile.length / 6;
	let bingoBoards = [];

	for (let i = 0; i < totalBoards; i++) {
		const startPosition = 1 + (i * 6);

		bingoBoards.push(new BingoBoard(inputFile.slice(startPosition, startPosition + 5)))
	}

	return bingoBoards;

}

class BingoBoard {
	constructor(board) {
		this.boardRaw = board;
		this.boardItems = this.parseBoard(this.boardRaw);
		this.matches = {
			row: [0,0,0,0,0],
			col: [0,0,0,0,0]
		};
	}

	parseBoard(boardRaw) {

		// Converts raw input board to flat array with position and state
		let parsedBoard = [];

		boardRaw.forEach((row, i) => {
			for (let j = 0; j < 5; j++) {
				let startPosition = 0 + (j * 3);
	
				parsedBoard.push({
					value: row.slice(startPosition, startPosition + 2).replace(' ', ''),
					row: i,
					col: j,
					matched: false
				})
			}
		});	

		return parsedBoard;
	}

	checkNumber(number) {

		// Checks if number is present in board
		const matchIndex = this.boardItems.findIndex(item => item.value === number );

		if (matchIndex >= 0) {
			// Retrieve details of matched item and update to reflect match
			let matchedItem = this.boardItems[matchIndex];

			matchedItem.matched = true;
			this.matches.row[matchedItem.row]++;
			this.matches.col[matchedItem.col]++;
		}
	}

	checkWin() {

		// Check if any row or column in the board is complete
		return this.matches.row.includes(5) ||
			this.matches.col.includes(5);

	}

	calculateScore(finalNumber) {
		
		// Retrieve and sum all unmatched items in the board
		const unmatchedItems = this.boardItems.filter(item => !item.matched);
		let unmatchedSum = 0;

		unmatchedItems.forEach(item => {
			unmatchedSum += parseInt(item.value);
		});

		// Score is unmatched sum multiplied by final number tested
		return parseInt(finalNumber) * unmatchedSum;
	}

}