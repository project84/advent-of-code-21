export default function (inputFile) {

	const { elves } = inputFile.reduce((calorieStats, snack) => {
		if (!snack.length) {
			return {
				current: 0,
				elves: [ ...calorieStats.elves, calorieStats.current ]
			}
		}

		return {
			...calorieStats,
			current: calorieStats.current + +snack
		};
	}, { current: 0, elves: [] })

	return {
		1: Math.max(...elves),
		2: null
	}
}