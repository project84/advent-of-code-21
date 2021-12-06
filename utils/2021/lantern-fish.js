import { sum as arraySum } from '../general/array-tools';

export class SchoolOfFish {
	constructor(startingSchool) {
		this.generations = this.initialise(startingSchool)
	}

	initialise(startingFish) {

		// Create an array of the number of fish at each generation level in the school
		let generations = [];

		for (let i = 0; i < 9; i++) {
			generations[i] = startingFish.filter(fish => parseInt(fish) === i).length;
		}

		return generations;
	}

	applyGeneration() {

		// Get the number of fish to be created this generation
		let newFishCount = this.generations.shift();
		this.generations.push(0);

		// Add new fish and reset fish that have just spawned
		this.generations[6] += newFishCount;
		this.generations[8] += newFishCount;

	}

	calculateTotalFish() {
		return arraySum(this.generations);
	}
}