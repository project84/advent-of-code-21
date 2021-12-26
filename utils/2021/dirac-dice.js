export class Player {

    constructor(position, score = 0) {
		this.currentPosition = parseInt(position);
		this.score = score
	}

	move(spaces) {
		
		// New player position can be determined by adding number of spaces to move to current position then taking final digit
		// If the final digit is 0 (any multiple of 10), the player is at position 10
		let newPosition = (this.currentPosition + spaces).toString();
		newPosition = parseInt(newPosition[newPosition.length - 1]);
		newPosition = newPosition ? newPosition : 10;

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