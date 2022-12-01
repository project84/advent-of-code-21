import { sum } from "../../utils/general/array-tools";
import { PriorityQueue } from "../../utils/general/priority-queue";

export default function (inputFile) {

	// Parse input file to list of calories carried by each elf
	const elves = inputFile.reduce((calorieStats, snack, i) => {
		// Add next snack calories to current elf calories
		const calories = calorieStats.current + +snack;

		if (!snack.length || i === inputFile.length - 1) {
			// Queue elf calories when all snacks have been counted for the elf
			calorieStats.queue.enqueue(calories, calories)
			return {
				...calorieStats,
				current: 0
			}
		}

		return {
			...calorieStats,
			current: calories
		};
	}, { current: 0, queue: new PriorityQueue() })
		.queue
		.items
		.map((qItem) => qItem.element);

	return {
		1: elves[elves.length - 1],
		2: sum(elves.slice(elves.length - 3))
	}
}