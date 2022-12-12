import { Area } from '../../utils/general/area';

export default function (inputFile) {

	const trees = new Area(inputFile);
	
	const { visible, scenicScore } = trees.map.reduce(({ visible, scenicScore }, tree) => {

		// Visibility and scenic score is calculted for every tree in the field individually
		// The reducer function is tracking the total number of visible trees and the current best scenic score

		const { x, y, value } = tree;
		if ([0, trees.size.x - 1].includes(x) || [0, trees.size.y -1].includes(y)) {

			// If the tree is at the outer edge of the field, it is visible and will have a scenic score of 0
			return {
				visible: visible + 1,
				scenicScore
			}

		}

		// For all other trees, create arrays of the heights of the trees between that tree and the outer edge of the field
		// The arrays are ordered such that position 0 is the closest tree to the one in focus
		const rowBefore = Array.from({ length: x }, (_, i) => trees.map[trees.getPositionIndex(i, y)].value).reverse();
		const rowAfter = Array.from({ length: trees.size.x - x - 1 }, (_, i) => trees.map[trees.getPositionIndex(i + x + 1, y)].value);
		const colBefore = Array.from({ length: y }, (_, i) => trees.map[trees.getPositionIndex(x, i)].value).reverse();
		const colAfter = Array.from({ length: trees.size.y - y - 1 }, (_, i) => trees.map[trees.getPositionIndex(x, i + y + 1)].value);

		// The scenic score for the tree is calculated, it is the product of the number of 
		// trees in each direction until the first tree of at least the same height.
		const treeScenicScore = (
			(rowBefore.findIndex((t) => t >= value) + 1 || rowBefore.length) *
			(rowAfter.findIndex((t) => t >= value) + 1 || rowAfter.length) *
			(colBefore.findIndex((t) => t >= value) + 1 || colBefore.length) *
			(colAfter.findIndex((t) => t >= value) + 1 || colAfter.length)
		)

		// The tree is visible unless there is a taller tree between the one in focus and the outer
		// edge in all directions
		return {
			visible: visible + +!(
				rowBefore.some((t) => t >= value) &&
				rowAfter.some((t) => t >= value) &&
				colBefore.some((t) => t >= value) &&
				colAfter.some((t) => t >= value)
			),
			scenicScore: treeScenicScore > scenicScore ? treeScenicScore : scenicScore
		}
	}, { visible: 0, scenicScore: 0 });

	return {
		1: visible,
		2: scenicScore
	}
}