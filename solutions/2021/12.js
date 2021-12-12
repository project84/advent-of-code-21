import { PathFinder } from '../../utils/2021/navigation';

export default function(inputFile) {

	/* Example */
	// Step 1: 10
	// Step 2: 36

	/* Actual */
	// Step 1: 5333
	// Step 2: 146553

    const cavePassages = new PathFinder(inputFile);

	// Retrieve all valid paths for step 2, then filter out those with duplicate small caves
	const allPaths = cavePassages.findPaths();
	const noDuplicateSmallCaves = allPaths.filter(path => !cavePassages.checkDuplicateSmallCaves(path))

    return {
		step1: noDuplicateSmallCaves.length,
		step2: allPaths.length
	}
	
}