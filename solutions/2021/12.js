import { PathFinder } from '../../utils/2021/navigation';

export default function(inputFile) {

	/* Examples 2-3? */

    const cavePassages = new PathFinder(inputFile);

	// Retrieve all valid paths for Part 2, then filter out those with duplicate small caves
	const allPaths = cavePassages.findPaths();
	const noDuplicateSmallCaves = allPaths.filter(path => !cavePassages.checkDuplicateSmallCaves(path))

    return {
		part1: noDuplicateSmallCaves.length,
		part2: allPaths.length
	}
	
}