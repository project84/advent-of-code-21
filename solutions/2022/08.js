import { Area } from '../../utils/general/area';

export default function (inputFile) {

	const trees = new Area(inputFile);
	
	trees.map = trees.map.map((tree) => {
		const { x, y } = tree;
		if ([0, trees.size.x - 1].includes(x) || [0, trees.size.y -1].includes(y)) {
			return {
				...tree,
				visible: true
			}
		}

		const rowBefore = Array.from({ length: x }, (_, i) => trees.map[trees.getPositionIndex(i, y)].value);
		const rowAfter = Array.from({ length: trees.size.x - x - 1 }, (_, i) => trees.map[trees.getPositionIndex(i + x + 1, y)].value);
		const colBefore = Array.from({ length: y }, (_, i) => trees.map[trees.getPositionIndex(x, i)].value);
		const colAfter = Array.from({ length: trees.size.y - y - 1 }, (_, i) => trees.map[trees.getPositionIndex(x, i + y + 1)].value);

		if (
			rowBefore.every((outer) => outer < tree.value) ||
			rowAfter.every((outer) => outer < tree.value) ||
			colBefore.every((outer) => outer < tree.value) ||
			colAfter.every((outer) => outer < tree.value)
		) {
			return {
				...tree,
				visible: true
			}
		}
		
		return tree;
	});

	return {
		1: trees.map.filter(({ visible }) => visible).length,
		2: null
	}
}