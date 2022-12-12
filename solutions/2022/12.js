import { PathFinder } from '../../utils/general/path-finder'
import { lower } from "../../fixtures/general/language/constants";

export default function (inputFile) {

	const heightMap = new PathFinder(inputFile, false);

	const startPos = heightMap.map.findIndex((position) => position.value === 'S');
	const endPos = heightMap.map.findIndex((position) => position.value === 'E');

	heightMap.map[startPos].value = 'a';
	heightMap.map[endPos].value = 'z';

	heightMap.findShortestPath(startPos, 
		(nextNode, neighbour) => lower.indexOf(neighbour) <= lower.indexOf(nextNode) + 1, 
		(nextNode) => nextNode.distance + 1
	);

	return {
		1: heightMap.map[endPos].distance,
		2: null
	}
}