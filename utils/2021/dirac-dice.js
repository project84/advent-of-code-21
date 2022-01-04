const rollFrequencies = require('../../fixtures/2021/dirac-dice-rolls.json');

export class Player {

    constructor(position, score = 0) {
		this.currentPosition = parseInt(position);
		this.score = score
	}

	move(spaces) {
		
		// New player position can be determined by adding number of spaces to move to current position then taking final digit
		// After reaching position 10, the player returns to position 1
		let newPosition = (this.currentPosition + spaces) % 10 || 10;

		this.currentPosition = newPosition;
		this.score += newPosition;
	}
	
}

// Basic die class with roll function and standard dice roll
export class Die {

    constructor() {
		this.calculateNextDie = this.randomSixSide;
		this.rollCount = 0;
	}

	roll(numRolls) {
		
		// Roll die specified number of times, returning total
		let total = 0;
		for (let i = 0; i < numRolls; i++) {
			total += this.nextRoll;
			this.calculateNextDie();
			this.rollCount++;
		}

		return total;
	}

	randomSixSide() {
		this.nextRoll =  Math.ceil(Math.random * 6);
	}
	
}

export class DeterministicDie extends Die {

	constructor() {
		super();
		this.nextRoll = 1;
		this.calculateNextDie = this.deterministicRoll;
	}

	deterministicRoll() {
		// Deterministic die starts at 1, increments until 100 then returns to 1
		this.nextRoll = this.nextRoll < 100 ? this.nextRoll + 1 : 1;
	}
	
}

export function calculateMultiUniverseWins(posA, scoreA, posB, scoreB) {

	if (scoreB >= 21) {
		return [ 0, 1 ];
	}

	let winsA = 0;
	let winsB = 0;
	let finalWins = []

	rollFrequencies.forEach(roll => {
		let newPosA = (posA + roll.total) % 10 || 10;
		let wins = calculateMultiUniverseWins(posB, scoreB, newPosA, scoreA + newPosA);

		finalWins[0] = winsA + roll.frequency * wins[0];
		finalWins[1] = winsB + roll.frequency * wins[1];
	});

	return finalWins;

}