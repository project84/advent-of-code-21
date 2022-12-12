import { PathFinder } from '../../utils/general/path-finder'
import { lower } from "../../fixtures/general/language/constants";

export default function (inputFile) {

	const heightMap = new PathFinder(inputFile, false);

	const initalStartPos = heightMap.map.findIndex((position) => position.value === 'S');
	const endPos = heightMap.map.findIndex((position) => position.value === 'E');

	heightMap.map[initalStartPos].value = 'a';
	heightMap.map[endPos].value = 'z';

	return heightMap.map.filter((position) => position.value === 'a').map((position) => position.index).reduce((solution, position) => {
		heightMap.findShortestPath(position, 
			(nextNode, neighbour) => lower.indexOf(neighbour) <= lower.indexOf(nextNode) + 1, 
			(nextNode) => nextNode.distance + 1
		);

		const pathLength = heightMap.map[endPos].distance;

		if (position === initalStartPos) {
			solution['1'] = pathLength;
		}

		if (pathLength < solution['2']) {
			solution['2'] = pathLength;
		}

		heightMap.reset();

		return solution;

	}, { '1': 0, '2': Infinity });
	
}