import { sum } from "../../utils/general/array-tools";
import { PriorityQueue } from "../../utils/general/priority-queue";

export default function (inputFile) {

	const { queue } = inputFile.reduce((calorieStats, snack, i) => {
		const calories = calorieStats.current + +snack;

		if (!snack.length || i === inputFile.length - 1) {
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
	}, { current: 0, queue: new PriorityQueue() });

	const elves = queue.items.map((qItem) => qItem.element);

	return {
		1: elves[elves.length - 1],
		2: sum(elves.slice(elves.length - 3))
	}
}