import { Area } from '../../utils/general/area';

export default function (inputFile) {

	const trees = new Area(inputFile);
	
	const { visible, scenicScore } = trees.map.reduce(({ visible, scenicScore }, tree) => {
		const { x, y, value } = tree;
		if ([0, trees.size.x - 1].includes(x) || [0, trees.size.y -1].includes(y)) {
			return {
				visible: visible + 1,
				scenicScore
			}
		}

		const rowBefore = Array.from({ length: x }, (_, i) => trees.map[trees.getPositionIndex(i, y)].value).reverse();
		const rowAfter = Array.from({ length: trees.size.x - x - 1 }, (_, i) => trees.map[trees.getPositionIndex(i + x + 1, y)].value);
		const colBefore = Array.from({ length: y }, (_, i) => trees.map[trees.getPositionIndex(x, i)].value).reverse();
		const colAfter = Array.from({ length: trees.size.y - y - 1 }, (_, i) => trees.map[trees.getPositionIndex(x, i + y + 1)].value);

		const treeScenicScore = (
			(rowBefore.findIndex((t) => t >= value) + 1 || rowBefore.length) *
			(rowAfter.findIndex((t) => t >= value) + 1 || rowAfter.length) *
			(colBefore.findIndex((t) => t >= value) + 1 || colBefore.length) *
			(colAfter.findIndex((t) => t >= value) + 1 || colAfter.length)
		)

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