import { PathFinder } from '../../utils/2021/navigation';

export default function(inputFile) {

	/* Example */
	// Part 1: 10
	// Part 2: 36

	/* Actual */
	// Part 1: 5333
	// Part 2: 146553

    const cavePassages = new PathFinder(inputFile);

	// Retrieve all valid paths for Part 2, then filter out those with duplicate small caves
	const allPaths = cavePassages.findPaths();
	const noDuplicateSmallCaves = allPaths.filter(path => !cavePassages.checkDuplicateSmallCaves(path))

    return {
		part1: noDuplicateSmallCaves.length,
		part2: allPaths.length
	}
	
}